import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './css/global.css'

const Home = lazy(() => import("./components/home/home"))

const App = () => {
	return(
		<div className="app-max-width">
			<BrowserRouter>
				<Suspense fallback={<div />}>
					<Routes>
						<Route exact element={<Home />} path="/" />
					</Routes>
				</Suspense>
			</BrowserRouter>
		</div>
	)
}

export default App