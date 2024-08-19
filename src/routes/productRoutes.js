import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/productController.js'

export const productRouter = Router()

productRouter.post('/', createController)
productRouter.get('/search', readController)
productRouter.get('/search/:id', readController)
productRouter.put('/:id', updateController)
productRouter.delete('/:id', deleteController)