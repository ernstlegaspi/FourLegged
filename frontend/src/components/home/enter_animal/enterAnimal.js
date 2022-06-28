import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Animal from './animal'
import { getAnimals } from '../../../actions/actions'

const EnterAnimal = ({ value }) => {
	const dispatch = useDispatch()
	const animals = useSelector(animal => animal.animals.animals)
	const hasAnimal = animals.filter(animal => new RegExp(`\\b${animal.name.toLowerCase()}`).test(value.toLowerCase()))

	useEffect(() => {
		dispatch(getAnimals())
	}, [dispatch])

	return(
		<Animal animal={hasAnimal} />
	)
}

export default EnterAnimal