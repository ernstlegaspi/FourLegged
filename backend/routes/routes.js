import express from 'express'

import { getAnimal, getAnimals, addAnimal } from '../controller/controller.js'

const route = express.Router()

route.get(`/`, getAnimals)
route.get(`/:id`, getAnimal)
route.post(`/`, addAnimal)

export default route