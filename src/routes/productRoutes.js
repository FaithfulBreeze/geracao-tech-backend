import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/productController.js'

export const productRouter = Router()

productRouter.post('/', createController)
productRouter.get('/search', readController)
productRouter.get('/', readController)
productRouter.put('/', updateController)
productRouter.delete('/', deleteController)