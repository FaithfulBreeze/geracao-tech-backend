import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.post('/user', createController)
userRouter.get('/user/:id', readController)
userRouter.put('/user/:id', updateController)
userRouter.delete('/user/:id', deleteController)