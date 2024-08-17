import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/categoryController.js'

export const categoryRouter = Router()

categoryRouter.post('/', createController)
categoryRouter.get('/search', readController)
categoryRouter.get('/:id', readController)
categoryRouter.put('/:id', updateController)
categoryRouter.delete('/:id', deleteController)