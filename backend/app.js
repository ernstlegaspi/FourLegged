import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 2217

dotenv.config()
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '40mb' }))
app.use(express.json())

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(() => console.log(`Server is running in port ${port}`)))
	.catch(e => console.log(`Connection Error: ${e}`))