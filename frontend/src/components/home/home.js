import React, { useEffect, useState, useRef } from 'react'
import {  Grid, TextField, Button, Grow } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

import EnterAnimal from './enter_animal/enterAnimal'
import AllAnimals from './all_animals/allAnimals'
import SearchAnimal from './search_animal/searchAnimal'
import './css/home.css'
import FirstLetter from './first_letter/firstLetter'

const Home = () => {
	const [defaultChoice, setDefaultChoice] = useState(true)
	const [showAllButton, setShowAllButton] = useState(false)
	const [byLetter, setByLetter] = useState(false)
	const [byLetterContinue, setByLetterContinue] = useState(false)
	const [showAll, setShowAll] = useState(false)
	const [getSearch, setSearch] = useState(false)
	const [enterSentence, setEnterSentence] = useState(false)
	const [enterSentenceButton, setEnterSentenceButton] = useState(false)
	const [search, setHandleSearch] = useState(false)
	const [searchValue, setSearchValue] = useState("")
	const [searchButton, setSearchButton] = useState(false)
	const [backButtonClicked, setBackButtonClicked] = useState(false)
	const [enterSentenceValue, setEnterSentenceValue] = useState("")
	const [byLetterValue, setByLetterValue] = useState("")
	const heightCounter = useRef(61)
	
	useEffect(() => {
		const form = document.getElementById(`home-form`)
		
		if(showAll || byLetterContinue || enterSentenceButton) {
			let a = setInterval(() => {
				form.style.height = `${heightCounter.current}px`
				if(heightCounter.current <= 600) heightCounter.current += 10
				else clearInterval(a)
			}, 1)
		}
		else {
			if(defaultChoice) {
				form.style.height = `auto`
			}
			else {
				if(backButtonClicked && (!showAll || !byLetterContinue || !enterSentenceButton)) {
					let a = setInterval(() => {
						form.style.height = `${heightCounter.current}px`
						if(heightCounter.current >= 70) heightCounter.current -= 10
						else {
							clearInterval(a)
							form.style.height = `auto`
						}
					}, 1)
				}
			}
		}
	}, [defaultChoice, backButtonClicked, enterSentenceButton, showAll, byLetterContinue, heightCounter])

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
	
	const handleGetSearch = () => {
		setDefaultChoice(false)
		setSearch(true)
	}

	const handleEnterSentence = () => {
		setSearch(false)
		setEnterSentence(true)
	}

	const handleEnterSentenceButton = () => {
		setEnterSentenceButton(true)
		setEnterSentence(false)
	}
	
	const handleSearch = () => {
		setSearch(false)
		setHandleSearch(true)
	}

	const handleSearchButton = () => {
		setHandleSearch(false)
		setSearchButton(true)
	}

	const cButton = (click, name) => <Button onClick={() => click()} className="home-form-button" fullWidth variant="outlined">{name}</Button>
	
	const defaultChoices = () => <Grid container spacing={2}>
		<Grid item xs={6}>{cButton(handleDefaultChoice, "Show All Animals")}</Grid>
		<Grid item xs={6}>{cButton(handleGetSearch, "Search or Enter")}</Grid>
	</Grid>

	const backButton = () => {
		if(showAllButton) {
			setDefaultChoice(true)
			setShowAllButton(false)
			setBackButtonClicked(false)
		}
		else if(byLetter) {
			setByLetter(false)
			setShowAllButton(true)
		}
		else if(byLetterContinue) {
			setByLetter(true)
			setBackButtonClicked(true)
			setByLetterContinue(false)
		}
		else if(getSearch) {
			setDefaultChoice(true)
			setSearch(false)
		}
		else if(search) {
			setSearch(true)
			setHandleSearch(false)
		}
		else if(searchButton) {
			setHandleSearch(true)
			setSearchButton(false)
		}
		else if(enterSentence) {
			setSearch(true)
			setEnterSentence(false)
		}
		else if(enterSentenceButton) {
			setEnterSentence(true)
			setEnterSentenceButton(false)
			setBackButtonClicked(true)
		}
		else {
			setShowAllButton(true)
			setShowAll(false)
			setBackButtonClicked(true)
		}
	}

	return(
		<div className="home">
			{
				defaultChoice ? null : <div onClick={() => backButton()} className="home-arrow-button">
					<ArrowBack className='arrow-button' />
				</div>
			}
			<div id="home-form" style={{ padding: searchButton || showAll || enterSentenceButton || byLetterContinue ? "0" : "20px", width: searchButton || enterSentenceButton || showAll || byLetterContinue || byLetter ? "auto" : "480px" }}>
				{
					defaultChoice ? <Grow in>{defaultChoices()}</Grow>
					: showAllButton ? <>
						<Grow className="none" out="true">{defaultChoices()}</Grow>
						<Grow in>
							<Grid container spacing={2}>
								<Grid item xs={6}>{cButton(handlSetShowAll, "Show All Four-Legged Animals")}</Grid>
								<Grid item xs={6}>{cButton(handleByLetterButton, "Show animal by first letter")}</Grid>
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
					: byLetterContinue ? <div className="home-all-animals"><FirstLetter byLetterValue={byLetterValue} /></div>
					: getSearch ? <>
						<Grow className="none" out="true">{defaultChoices()}</Grow>
						<Grow in>
							<Grid container spacing={2}>
								<Grid item xs={6}>{cButton(handleSearch, "Search for an animal")}</Grid>
								<Grid item xs={6}>{cButton(handleEnterSentence, "Enter a sentence")}</Grid>
							</Grid>
						</Grow>
					</>
					: search ? <Grow in>
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<TextField value={searchValue} onChange={e => setSearchValue(e.target.value)} fullWidth label='Search for an animal' variant="outlined" /> <br />
							</Grid>
							<Grid item xs={3}>
								<Button onClick={() => handleSearchButton()} fullWidth className="home-by-letter-button home-form-button" variant="outlined">Submit</Button>
							</Grid>
						</Grid>
					</Grow>
					: searchButton ? <div className="home-all-animals"><SearchAnimal searchValue={searchValue} /></div>
					: enterSentence ? <Grow in>
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<TextField value={enterSentenceValue} onChange={e => setEnterSentenceValue(e.target.value)} fullWidth label='Enter a Sentence' variant="outlined" /> <br />
							</Grid>
							<Grid item xs={3}>
								<Button onClick={() => handleEnterSentenceButton()} fullWidth className="home-by-letter-button home-form-button" variant="outlined">Submit</Button>
							</Grid>
						</Grid>
					</Grow>
					: enterSentenceButton ? <EnterAnimal value={enterSentenceValue} />
					: <div className="home-all-animals"><AllAnimals /></div>
				}
			</div>
		</div>
	)
}

export default Home
