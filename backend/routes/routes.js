import express from 'express'

import { getAnimal, getAnimals, addAnimal, search } from '../controller/controller.js'

const route = express.Router()

route.get(`/`, getAnimals)
route.post(`/search`, search)
route.get(`/:id`, getAnimal)
route.post(`/`, addAnimal)

export default route