import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Grow } from '@material-ui/core'

import { getAnimals } from '../../../actions/actions'

const FirstLetter = ({ byLetterValue }) => {
	const animals = useSelector(animal => animal.animals.animals)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAnimals())
	}, [dispatch])
	
	return(
		animals.filter(animal => animal.name.toLowerCase().charAt(0) === byLetterValue.toLowerCase()).map(animal => {
			return <Grow key={animal._id} in>
				<Grid className="home-all-animals-container" container>
					<Grid className="home-all-animals-container-left" item xs={7}>
						<p className="home-all-animals-container-left-name">{animal.name}</p>
						<p className="home-all-animals-container-left-description">{animal.description}</p>
					</Grid>
					<Grid className="home-all-animals-container-right" item xs={5}>
						<img src={animal.image} alt={animal.name} />
					</Grid>
				</Grid>
			</Grow>
		})
	)
}

export default FirstLetter