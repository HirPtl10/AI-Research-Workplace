import express from "express"
import cors from "cors"
import methodOverride from "method-override"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { client } from "@repo/db"
import cookieParser from "cookie-parser"
import { SignInSchema, SignUpSchema, createProjectSchema, createDepartmentSchema, createMessageSchema } from "@repo/common-types"
import { HandleError } from "./ErrorHandler"
import { errorHandler } from "./middleware/errorMiddleware"
import { authMiddleware } from "./middleware/auth"
import { GoogleGenAI } from "@google/genai"
import { asyncWrapProviders } from "async_hooks"
import { generateResponse } from "./generateAI"

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", async (req, res, next) => {

    let { success } = SignInSchema.safeParse(req.body);
    if (!success) {
        throw new HandleError("Username/Password in incorrect format", 404);
    }
    let username = req.body.username;
    let password = req.body.password;
    try {
        let user = await client.user.findUnique({
            where: {
                username: username
            }
        })
        if (user) {
            return res.json({
                message: "User already exsists"
            })
        }
        let hash = await bcrypt.hash(password, 10)
        user = await client.user.create({
            data: {
                username: username,
                password: hash
            }
        })

        let token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, 'sec', { expiresIn: 60 * 60 * 1000 });
        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
                path: "/"
            }
        )
        console.log(token);
        return res.json({
            message: `Account ${username} has been created and successfully logged in!`
        });
    } catch (e) {
        next(e);
    }
});
app.post("/signin", async (req, res, next) => {
    try {
        let { success } = SignInSchema.safeParse(req.body);

        if (!success) {
            console.log(
                "zod issue"
            )
            throw new HandleError("Username/Password in incorrect format", 401);
        }

        let username = req.body.username;
        let password = req.body.password;
        let token = req.cookies.token;
        if (token) {
            try {
                let decoded = jwt.verify(token, 'sec')
                if (decoded) {
                    return res.json("already signed in");
                }
            } catch (e) {
                console.log(e);
            }
        }
        let user = await client.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            return res.json("No user found");
        }

        let hashedPassword = user.password;
        const result = await bcrypt.compare(password, hashedPassword);
        if (!result) {
            return res.json("Invalid password");
        }
        let newToken = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, 'sec');

        res.cookie(
            "token",
            newToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
                path: "/"
            });
        console.log(newToken);
        return res.json({
            message: "successfully loggedin"
        })
    } catch (e) {
        next(e);
    }
})

app.post("/logout", authMiddleware, (req, res) => {
    console.log("Inside logout route")
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/"
    })

    return res.json({ message: "Logged Out" })
})

app.post("/createProject", authMiddleware, async (req, res) => {
    let userId = req.id;
    let name = req.body.name;
    let { success } = createProjectSchema.safeParse(req.body);
    console.log("new project req")
    if (!success) {
        throw new HandleError("Incorrect format for project name", 403);
    }
    try {
        let newProject = await client.project.create({
            data: {
                name: name,
                ownerId: userId
            }
        })

        let generelDept = await client.department.create({
            data: {
                name: "General",
                projectId: newProject.id,
                isGeneral: true
            }
        })

        return res.json({
            name: newProject.name,
            id: newProject.id
        })
    } catch (e) {
        return res.status(403).json({
            message: "Failed to create a new Projct, Please try again"
        })
    }
})

app.get("/getProjects", authMiddleware, async (req, res, next) => {
    let userId = req.id;
    try {
        let names = await client.project.findMany({
            where: {
                ownerId: userId
            }
        })

        return res.send(names.map(project => ({
            name: project.name,
            id: project.id
        })));
    } catch (e) {
        next(e);
    }
})

app.post("/createDepartment/:projectId", authMiddleware, async (req, res) => {

    let projectId = req.params.projectId;
    let name = req.body.name;
    let { success } = createDepartmentSchema.safeParse(req.body);
    console.log('received req')
    if (!success) {
        throw new HandleError("Incorrect format for department name", 403);
    }
    try {
        let newDepartment = await client.department.create({
            data: {
                // @ts-ignore
                projectId: projectId,
                name: name,
                isGeneral: false
            }
        })

        let newConversation = await client.conversation.create({
            data: {
                departmentId: newDepartment.id
            }
        })
        res.json({
            name: newDepartment.name,
            id: newDepartment.id,
            conversation: newConversation
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: "Failed to create department"
        })
    }
})

app.get("/getDepartments/:projectId", authMiddleware, async (req, res, next) => {
    try {
        let projectId = req.params.projectId;

        let departments = await client.department.findMany({
            where: {
                //@ts-ignore
                projectId: projectId
            },
            select: {
                id: true,
                name: true,
                conversation: true
            }
        })

        res.json(departments)

    } catch (err) {
        res.status(403).json({
            message: "Failed to fetch the deparments"
        })
    }
})

app.delete("/deleteDepartment/:departmentId", authMiddleware, async (req, res, next) => {
    console.log("received req to dlt");
    let id = req.params.departmentId;
    console.log(id);
    try {

        const department = await client.department.findUnique({
            where: {
                //@ts-ignore
                id
            },
            include: {
                conversation: true
            }
        });

        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        await client.conversation.delete({
            where: {
                //@ts-ignore
                id: department.conversation.id
            }
        });

        await client.department.delete({
            where: {
                //@ts-ignore
                id
            }
        });

        console.log("deleted!");
        return res.json({
            message: "deleted"
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
})

app.post("/createMessage/:conversationId", authMiddleware, async (req, res, next) => {
    console.log("recveived req for creation message")
    let { success } = createMessageSchema.safeParse(req.body);
    if (!success) {
        throw new HandleError("Invalid message content format", 404);
    }
    try {
        let message = await client.message.create({
            data: {
                content: req.body.content,
                conversationId: Number(req.params.conversationId),
                role: req.body.role
            },
            select: {
                content: true,
                id: true,
                conversationId: true,
                role: true
            }
        })
        const aiContent = await generateResponse(message.content);

        console.log("AI response generated:", aiContent);

        const aiMessage = await client.message.create({
            data: {
                content: aiContent,
                conversationId: Number(req.params.conversationId),
                role: "assistant",
            },
            select: {
                content: true,
                id: true,
                conversationId: true,
                role: true,
            },
        });

        console.log("AI message created");
       
        return res.json(aiMessage);
    } catch (err) {
        next(err)
    }
})

app.get("/getMessages/:conversationId", authMiddleware, async (req, res, next) => {
    try {
        let messages = await client.conversation.findUnique({
            where: {
                id: Number(req.params.conversationId)
            },
            select: {
                messages: true
            }
        })
        return res.json(messages?.messages ?? []);
    } catch (err) {
        next(err);
    }
})

app.use(errorHandler);

app.listen(3001, () => {
    console.log("web server listening on port 3001");
});
