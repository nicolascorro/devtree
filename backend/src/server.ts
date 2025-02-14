import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

connectDB()

const app = express()

// cors
app.use(cors(corsConfig))

// Read form data
app.use(express.json())

// Main route
app.use('/', router)

export default app