import { Request, Response } from "express"
import  { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserController {
    async addUser (request: Request, response: Response) {
        const { username, password } = request.body
        if(!username || !password) return response.status(400).json({message: 'Preencha todos os campos!'})
        const isUsername = await prisma.user.findUnique({where: username})
        if(isUsername) return response.status(409).json({message: 'Username já em uso!'})
        try {
            const user = await prisma.user.create({data: { username, password }})
            return response.status(201).json(user)
        } catch (error:any) {
            return response.status(500).json({message: error.message})
        }
    }
}

export default new UserController()
