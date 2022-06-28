import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Grow, CircularProgress } from '@material-ui/core'

import { searchAnimal } from '../../../actions/actions'

const FirstLetter = ({ searchValue }) => {
	const animals = useSelector(animal => animal.animals.animals)
	const animal = useRef("")
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(searchAnimal({ name: searchValue.charAt(0).toUpperCase() + searchValue.slice(1) }))
		animal.current = animals
	}, [animals, searchValue, dispatch])
	
	return(
		animal.current ? animal.current.message !== "Animal not found" ? <Grow key={animal.current._id} in>
			<Grid className="home-all-animals-container" container>
				<Grid className="home-all-animals-container-left" item xs={7}>
					<p className="home-all-animals-container-left-name">{animal.current.name}</p>
					<p className="home-all-animals-container-left-description">{animal.current.description}</p>
				</Grid>
				<Grid className="home-all-animals-container-right" item xs={5}>
					<img src={animal.current.image} alt={animal.current.name} />
				</Grid>
			</Grid>
		</Grow> : <p>No four-legged animal detected.</p>
		: <CircularProgress />
	)
}

export default FirstLetter