import { Router } from 'express'
import { createController, readController, updateController, deleteController } from '../controllers/productController.js'
import { Auth } from '../middleware/auth.js'

export const productRouter = Router()

productRouter.post('/', Auth, createController)
productRouter.get('/search', readController)
productRouter.get('/search/:id', readController)
productRouter.put('/:id', Auth, updateController)
productRouter.delete('/:id', Auth, deleteController)