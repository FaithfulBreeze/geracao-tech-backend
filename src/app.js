import express from 'express'
import cookieParser from 'cookie-parser'
import { serverStart } from './services/serverStart.js'
import config from './config/dotenvConfig.js'

import { userRouter } from './routes/userRoutes.js'
import { categoryRouter } from './routes/categoryRoutes.js'
import { productRouter } from './routes/productRoutes.js'
import { authRouter } from './routes/authRoute.js'

export const app = express()

serverStart()

app.use(express.json())
app.use(cookieParser())

app.use('/v1/user/token', authRouter)
app.use('/v1/user', userRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/product', productRouter)
