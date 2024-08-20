import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/categoryController.js'
import { Auth } from '../middleware/auth.js'

export const categoryRouter = Router()

categoryRouter.post('/', Auth, createController)
categoryRouter.get('/search', readController)
categoryRouter.get('/:id', readController)
categoryRouter.put('/:id', Auth, updateController)
categoryRouter.delete('/:id', Auth, deleteController)