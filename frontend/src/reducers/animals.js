import { GET_ANIMALS, GET_ANIMAL, ADD_ANIMAL } from '../constants/constants'

const Animals = (animals = [], action) => {
	switch(action.type) {
		case GET_ANIMALS:
		case GET_ANIMAL:
			return action.payload
		case ADD_ANIMAL: return [ ...animals, action.payload ]
		default: return animals
	}
}

export default Animals