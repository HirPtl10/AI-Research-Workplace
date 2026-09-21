import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import { client } from "@repo/db";

export let authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(403).json({
                message: "Log in to continue"
            })
        }

        const decoded = jwt.verify(token, 'sec');

        if(typeof decoded === 'object' && decoded != null && 'id' in decoded) {
            req.id = decoded.id;
            next();
        } else {
            return res.status(403).json({
                message: "Invalid token or token format"
            })
        }
    } catch(err) {
        return res.status(403).json({
            message: "Invalid or expired token sent"
        })
    }
}
