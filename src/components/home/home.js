import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'

import './css/home.css'
import raw from './animals.txt';

const Home = () => {
	const [getAnimals, setAnimals] = useState()
	const [getAnimal, setAnimal] = useState()
	
	useEffect(() => {
		fetch(raw)
			.then(res => res.text())
			.then(data => {
				setAnimals(data.toLowerCase())
			})
			.catch(e => console.log(e))
	})
	
	const handleClick = () => {
		const tf = document.getElementById(`textfield`)
		const image = document.getElementById(`image`)
		
		if(getAnimals.includes(tf.value)) {
		}
	}
	
	return(
		<div className="home">
			<div className='home-form'>
				<Grid container spacing={2}>
					<Grid item xs={8}>
						<TextField id="textfield" label="Animal" variant="outlined" fullWidth />
					</Grid>
					<Grid item xs={4}>
						<Button onClick={() => handleClick()} className="home-form-submit" fullWidth variant="outlined">Submit</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default Home
