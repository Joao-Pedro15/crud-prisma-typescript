import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const { addUser } = require('./controllers/userController.ts')

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

// app.post('/addUser', async (req: Request, res: Response) => {
//     const { username, password } = req.body
//     const user = await prisma.user.create({
//         data: {
//             username,
//             password
//         },
//     })
//     return res.status(200).json(user)
// })

app.post('/addUser', addUser)

app.post('/manyUsers', async (req: Request, res: Response) => {
    const { userList } = req.body
    // const user = await prisma.user.createMany({
    //     data: userList
    // })
    const user = await prisma.user.create({
        data: userList
    })
    return res.status(200).json(user)

    //A função createMany não é suportada pelo SQLite,
    //Por isso ele irá dar erro aqui!
})

app.post('/addCar', async (req: Request, res: Response) => {
    const { modelType, year, userId } = req.body
    const car = await prisma.car.create({
        data: {
            modelType,
            year,
            userId
        }
    })
    return res.status(200).json(car)
})


app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {Car: true}
    })
    return res.status(200).json(users)
})

app.get('/user/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    })
    return res.status(200).json(user)
})

app.get('/cars', async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany()
    return res.status(200).json(cars)
})

app.put('/', async (req: Request, res: Response) => {
    const { id, username } = req.body
    const updateUser = await prisma.user.update({
        where: {
            id
        },
        data:{
            username
        }
    })
    return res.status(204).json({message: "Usuário foi atualizado!"})
})

app.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const deleteUser = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    })
    return res.status(200).json({message: "Usuário deletado!",  user: deleteUser})  
})


app.listen(3031, () => {
    console.log('Server running on port 3030')
})