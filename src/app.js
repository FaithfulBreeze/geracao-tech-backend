import express from 'express'
import { serverStart } from './services/serverStart.js'
import config from './config/dotenvConfig.js'

import { userRouter } from './routes/userRoutes.js'
import { categoryRouter } from './routes/categoryRoutes.js'

export const app = express()

serverStart()

app.use(express.json())

app.use('/v1/user', userRouter)
app.use('/v1/category', categoryRouter)
