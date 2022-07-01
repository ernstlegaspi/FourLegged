import React from 'react'
import { CircularProgress, Grid, Grow } from '@material-ui/core'

import "./css/enterAnimal.css"

const Animal = ({ animal }) => {
	return(
		animal.length !== 0 ? <div className="home-all-animals">{
			animal.map(({ _id, name, description, image }) => {
				return <Grow key={_id} in>
					<Grid className="home-all-animals-container" container>
						<Grid className="home-all-animals-container-left" item xs={7}>
							<p className="home-all-animals-container-left-name">{name}</p>
							<p className="home-all-animals-container-left-description">{description}</p>
						</Grid>
						<Grid className="home-all-animals-container-right" item xs={5}>
							<img src={image} alt={name} />
						</Grid>
					</Grid>
				</Grow>
			})
		}</div>
		: <div className="enter-circular">
			<CircularProgress />
		</div>
	)
}

export default Animal