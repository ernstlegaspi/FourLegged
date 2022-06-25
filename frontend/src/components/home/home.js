import React, { useEffect, useState, useRef } from 'react'
import { CircularProgress, Grid, TextField, Button, Grow } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { getAnimals } from '../../actions/actions'
import './css/home.css'

const Home = () => {
	const [defaultChoice, setDefaultChoice] = useState(true)
	const [showAllButton, setShowAllButton] = useState(false)
	const [byLetter, setByLetter] = useState(false)
	const [byLetterContinue, setByLetterContinue] = useState(false)
	const [byLetterValue, setByLetterValue] = useState("")
	const [showAll, setShowAll] = useState(false)
	const animals = useSelector(animal => animal.animals.animals)
	const heightCounter = useRef(61)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAnimals())
	}, [dispatch])
	
	useEffect(() => {
		const form = document.getElementById(`home-form`)
		
		if(showAll || byLetterContinue) {
			let a = setInterval(() => {
				form.style.height = `${heightCounter.current}px`
				if(heightCounter.current <= 600) heightCounter.current += 10
				else clearInterval(a)
			}, 1)
		}
	}, [showAll, byLetterContinue, heightCounter])

	const handleDefaultChoice = () => {
		setShowAllButton(true)
		setDefaultChoice(false)
	}

	const handlSetShowAll = () => {
		setShowAllButton(false)
		setShowAll(true)
	}

	const handleByLetterButton = () => {
		setShowAllButton(false)
		setByLetter(true)
	}

	const handleByLetterClick = () => {
		const letterOnly = new RegExp("^[a-zA-Z]")
		
		if(!letterOnly.test(byLetterValue)) alert("Letter Only.")
		else {
			setByLetter(false)
			setByLetterContinue(true)
		}
	}
	
	const defaultChoices = () => <Grid container spacing={2}>
		<Grid item xs={6}>
			<Button onClick={() => handleDefaultChoice()} className="home-form-button" fullWidth variant="outlined">Show All Animals</Button>
		</Grid>
		<Grid item xs={6}>
			<Button className="home-form-button" fullWidth variant="outlined">Enter a Sentence</Button>
		</Grid>
	</Grid>

	return(
		<div className="home">
			<div id="home-form" style={{ padding: showAll || byLetterContinue ? "0" : "20px", width: showAll || byLetterContinue || byLetter ? "auto" : "480px" }}>
				{
					defaultChoice ? <Grow in>{defaultChoices()}</Grow>
					: showAllButton ? <>
						<Grow className="none" out="true">{defaultChoices()}</Grow>
						<Grow in>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Button onClick={() => handlSetShowAll()} className="home-form-button" fullWidth variant="outlined">Show All Four-Legged Animals</Button>
								</Grid>
								<Grid item xs={6}>
									<Button onClick={() => handleByLetterButton()} className="home-form-button" fullWidth variant="outlined">Show animal by first letter</Button>
								</Grid>
							</Grid>
						</Grow>
					</>
					: byLetter ? <Grow in>
						<Grid container spacing={2}>
							<Grid item xs={5}>
								<TextField inputProps={{ maxLength: 1 }} value={byLetterValue} onChange={e => setByLetterValue(e.target.value)} fullWidth label='First Letter' variant="outlined" /> <br />
							</Grid>
							<Grid item xs={7}>
								<Button onClick={() => handleByLetterClick()} fullWidth className="home-by-letter-button home-form-button" variant="outlined">Submit</Button>
							</Grid>
						</Grid>
					</Grow>
					: byLetterContinue ? <div className="home-all-animals">{
						animals.filter(animal => animal.name.charAt(0) === byLetterValue).map(animal => {
							return <Grow in>
								<Grid key={animal._id} className="home-all-animals-container" container>
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
					}</div>
					: <>
						<div className="home-all-animals">{
							animals ? animals.map(animal => {
								return <Grow in>
										<Grid key={animal._id} className="home-all-animals-container" container>
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
							: <CircularProgress />
						}</div>
					</>
				}
			</div>
		</div>
	)
}

export default Home
