import type { Request, Response, NextFunction } from "express"
import { HandleError } from "../ErrorHandler"

export let errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof HandleError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(403).json({
        message: "Internal Server Error"
    })
}