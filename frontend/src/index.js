import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import animals from './reducers'

const store = configureStore({
	animals: { animals: animals }
})

ReactDOM.createRoot(document.getElementById(`root`)).render(<Provider store={store}><App /></Provider>)