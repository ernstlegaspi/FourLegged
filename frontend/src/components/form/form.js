import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import Filebase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import { addAnimal, getAnimals } from '../../actions/actions'
import "./css/form.css"

const Form = () => {
	const animals = useSelector(animal => animal.animals.animals)
	const [animalData, setAnimalData] = useState({ name: '', description: '', image: '' })
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAnimals())
	}, [dispatch])

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(addAnimal(animalData))
		setAnimalData({ name: '', description: '', image: '' })
	}

	const handleSetAnimalData = e => setAnimalData({ ...animalData, [e.target.name]: e.target.value })
	
	return(
		<Grid className="grid" container spacing={6}>
			<Grid item>
				<form onSubmit={handleSubmit}>
					<br />
					<TextField autoComplete="off" name="name" variant="outlined" label="Name" value={animalData.name} onChange={handleSetAnimalData} /> <br /><br />
					<TextField autoComplete='off' name="description" variant="outlined" label="Description" value={animalData.description} onChange={handleSetAnimalData} /> <br /><br />
					<Filebase value={animalData.image} onDone={({ base64 }) => setAnimalData({ ...animalData, image: base64 })} /> <br /><br /><br /><br /><br /><br />
					<Button type="submit" variant='outlined'>Submit</Button>
				</form>
			</Grid>
			<Grid className="overflow" item>
				{
					animals ? animals.map((animal, index) => {
						return <p key={animal._id}>{animal.name}</p>
					})
					: null
				}
			</Grid>
		</Grid>
	)
}

export default Form