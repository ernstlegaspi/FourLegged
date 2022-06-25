import React, { useEffect, useState, useRef } from 'react'
import { CircularProgress, Grid, TextField, Button, Grow } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { getAnimals } from '../../actions/actions'
import './css/home.css'
// import raw from './animals.txt';

const Home = () => {
	const [defaultChoice, setDefaultChoice] = useState(true)
	const [showAllButton, setShowAllButton] = useState(false)
	const [showAll, setShowAll] = useState(false)
	const animals = useSelector(animal => animal.animals.animals)
	const heightCounter = useRef(61)
	const dispatch = useDispatch()
	// const [getAnimals, setAnimals] = useState()
	// const [getAnimal, setAnimal] = useState()
	
	// useEffect(() => {
	// 	fetch(raw)
	// 		.then(res => res.text())
	// 		.then(data => {
	// 			setAnimals(data.toLowerCase())
	// 		})
	// 		.catch(e => console.log(e))
	// })
	
	// const handleClick = () => {
	// 	const tf = document.getElementById(`textfield`)
	// 	const image = document.getElementById(`image`)
		
	// 	if(getAnimals.includes(tf.value)) {
	// 	}
	// }

	useEffect(() => {
		dispatch(getAnimals())
	}, [dispatch])
	
	useEffect(() => {
		const form = document.getElementById(`home-form`)
		
		if(showAll) {
			let a = setInterval(() => {
				form.style.height = `${heightCounter.current}px`
				if(heightCounter.current <= 600) heightCounter.current += 10
				else clearInterval(a)
			}, 1)
		}
	}, [showAll, heightCounter])

	const handleDefaultChoice = () => {
		setShowAllButton(true)
		setDefaultChoice(false)
	}
	
	const defaultChoices = () => <Grid container spacing={2}>
		<Grid item xs={6}>
			<Button onClick={() => handleDefaultChoice()} className="home-form-button" fullWidth variant="outlined">Show All Animals</Button>
		</Grid>
		<Grid item xs={6}>
			<Button className="home-form-button" fullWidth variant="outlined">Enter a Sentence</Button>
		</Grid>
	</Grid>

	const handlSetShowAll = () => {
		setShowAllButton(false)
		setShowAll(true)
	}

	const secondShowChoices = () => <Grid container spacing={2}>
		<Grid item xs={6}>
			<Button onClick={() => handlSetShowAll()} className="home-form-button" fullWidth variant="outlined">Show All Four-Legged Animals</Button>
		</Grid>
		<Grid item xs={6}>
			<Button className="home-form-button" fullWidth variant="outlined">Show animal by first letter</Button>
		</Grid>
	</Grid>
	
	return(
		<div className="home">
			<div id="home-form" style={{ padding: !defaultChoice && !showAllButton ? "0" : "20px", width: !defaultChoice && !showAllButton ? "auto" : "480px" }}>
				{
					defaultChoice ? <Grow in>{defaultChoices()}</Grow>
					: showAllButton ? <>
						<Grow className="none" out="true">{defaultChoices()}</Grow>
						<Grow in>{secondShowChoices()}</Grow>
					</>
					: <>
						<Grow className="none" out="true">{secondShowChoices()}</Grow>
						<Grow in>
							<div className="home-all-animals">{
								animals ? animals.map(animal => {
									 return <Grid key={animal._id} className="home-all-animals-container" container>
										<Grid className="home-all-animals-container-left" item xs={7}>
											<p className="home-all-animals-container-left-name">{animal.name}</p>
											<p className="home-all-animals-container-left-description">{animal.description}</p>
										</Grid>
										<Grid className="home-all-animals-container-right" item xs={5}>
											<img src={animal.image} alt={animal.name} />
										</Grid>
									</Grid>
								})
								: <CircularProgress />
							}</div>
						</Grow>
					</>
				}
			</div>
		</div>
	)
}

export default Home
