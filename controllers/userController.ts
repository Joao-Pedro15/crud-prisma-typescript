import { Request, Response } from "express"
import  { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addUser (req: Request, res: Response) {
    const { username, password } = req.body
    if(!username || !password) return res.status(400).json({message: "Preencha todos os campos!"})
    const isUsername = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(isUsername) return res.status(409).json({message: "Username já em uso!"})
    try{
        const user = await prisma.user.create({
            data:{
                username,
                password
            }
        })
        return res.status(201).json(user)
    }catch(err){
        return res.status(500).json({message: "Houve um erro interno!", error: err})
    }
}

