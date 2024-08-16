import express from 'express'
import { serverStart } from './services/serverStart.js'
import { userRouter } from './routes/userRoutes.js'
import { User } from './models/User.js'

export const app = express()
app.use(express.json())
serverStart()

app.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

app.use('/v1', userRouter)
