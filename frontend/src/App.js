import React, { useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './css/global.css'
import song from  "./css/song.mp3"

const Home = lazy(() => import("./components/home/home"))
const Form = lazy(() => import("./components/form/form"))

const App = () => {
	const aud = useRef()

	window.onload = () => {
		aud.current.play()
	}
	
	return(
		<div className="app-max-width">
			<audio src={song} ref={aud} />
			<BrowserRouter>
				<Suspense fallback={<div />}>
					<Routes>
						<Route exact element={<Home />} path="/" />
						<Route exact element={<Form />} path="/form" />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App