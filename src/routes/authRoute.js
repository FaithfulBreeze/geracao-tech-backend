import { Router } from 'express'
import { getToken } from '../controllers/authController.js'

export const authRouter = Router()

authRouter.post('/', getToken)