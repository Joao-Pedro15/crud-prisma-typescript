import { Request, Response } from "express"
import  { PrismaClient } from '@prisma/client'
import { sign } from "jsonwebtoken"
import 'dotenv/config'
import { RedisAdapter } from '../adapters/integration/RedisAdapter'
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

    async login(request: Request, response: Response) {
        try {
            const { username, password } = request.body

            const user = await prisma.user.findMany({
                where:{
                    username
                }
            })

            if(!user[0]) return response.status(404).json({message: 'not found user'})
            if(user[0].password !== password) return response.status(401).json('incorrect password')
            const token = sign({}, String(process.env.SECRET), { subject: String(user[0].id) })

            await new RedisAdapter().setRedis(`user-${user[0].id}`, JSON.stringify(user))

            return response.status(200).json(token)
            

        } catch (error:any) {
            return response.status(500).json({message: error.message})
        }
    }

    async getUser(request: Request, response: Response) {
        const id = request.params.id
        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            return response.status(200).json(user)
        } catch (error:any) {
            return response.status(500).json({message: error.message})
        }
    }
}

export default new UserController()
