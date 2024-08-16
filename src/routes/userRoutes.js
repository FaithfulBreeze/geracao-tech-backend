import { Router } from 'express'
import { createController, readController } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.post('/user', createController)
userRouter.get('/user/:id', readController)