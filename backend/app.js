import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Routes from './routes/routes.js'
import Specific from './routes/specific.js'

const app = express()
const port = process.env.PORT || 2217

dotenv.config()
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '40mb' }))
app.use(express.json())

app.use(`/animals`, Routes)
app.use(`/specific`, Specific)

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(port, () => console.log(`Server is running in port ${port}`)))
	.catch(e => console.log(`Connection Error: ${e}`))