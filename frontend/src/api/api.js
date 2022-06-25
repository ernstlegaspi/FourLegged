import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:2217/" })

export const getAnimals = () => API.get(`animals`)
export const getAnimal = id => API.get(`animals/${id}`)
export const addAnimal = animalData => API.post(`animals`, animalData)