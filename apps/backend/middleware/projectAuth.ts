import { client } from "@repo/db";
import type { Request, Response, NextFunction } from "express";
import { HandleError } from "../ErrorHandler";

export const projectAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside project auth middleware")
    let userId  = req.id;
    let projectId = req.params.projectId;

    try {

    let project = await client.project.findUnique({
        where: {
            //@ts-ignore
            id: projectId
        }
    })
    
    if(!project) return res.status(404).json({message: "Project dosen't exsist"})

    if(project.ownerId != userId) {
        console.log("Dosent work")
        return res.status(403).json({
            message: "Unathorized to this page"
        })
    }
    
    next();
    } catch(err) {
        console.log(err);
    }
}