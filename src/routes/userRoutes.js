import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/userController.js'

export const userRouter = Router()

userRouter.post('/', createController)
userRouter.get('/:id', readController)
userRouter.put('/:id', updateController)
userRouter.delete('/:id', deleteController)