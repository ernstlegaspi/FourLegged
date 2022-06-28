import express from 'express'

import { getEnterSentence } from '../controller/specific.js'

const route = express.Router()

route.get(`/`, getEnterSentence)

export default route