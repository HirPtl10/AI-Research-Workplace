import { z } from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(5).max(12)
})

export const SignInSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(5).max(12)
})

export const createProjectSchema = z.object({
    name: z.string().min(3).max(15)
})

export const createDepartmentSchema = z.object({
    name: z.string().min(3).max(15)
})

export const createMessageSchema = z.object({
    content: z.string().min(5).max(1000),
    role: z.enum(["user", "assistant"])
})