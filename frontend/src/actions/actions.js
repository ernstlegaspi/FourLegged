import * as api from '../api/api'

import { GET_ANIMALS, GET_ANIMAL, ADD_ANIMAL } from '../constants/constants'

export const getAnimals = () => async dispatch => {
	try {
		const { data } = await api.getAnimals()
		
		dispatch({ type: GET_ANIMALS, payload: data })
	}
	catch(e) {
		console.log(e)
	}
}

export const getAnimal = id => async dispatch => {
	try {
		const { data } = await api.getAnimal(id)
		
		dispatch({ type: GET_ANIMAL, payload: data })
	}
	catch(e) {
		console.log(e)
	}
}

export const addAnimal = animalData => async dispatch => {
	try {
		const { data } = await api.addAnimal(animalData)
		
		dispatch({ type: ADD_ANIMAL, payload: data })
	}
	catch(e) {
		console.log(e)
	}
}