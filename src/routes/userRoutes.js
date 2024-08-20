import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/userController.js'
import { Auth } from '../middleware/auth.js'

export const userRouter = Router()

userRouter.post('/', createController)
userRouter.get('/:id', readController)
userRouter.put('/:id', Auth, updateController)
userRouter.delete('/:id', Auth, deleteController)