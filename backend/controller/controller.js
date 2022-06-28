import Model from '../model/model.js'

export const getAnimals = async (req, res) => {
	try {
		const animals = await Model.find()
		res.status(200).json(animals)
	}
	catch(e) {
		res.status(400).json({ message: e.message })
	}
}

export const getAnimal = async (req, res) => {
	try {
		const { id } = req.params
		const animal = await Model.findById(id)

		res.status(200).json(animal)
	}
	catch(e) {
		res.status(400).json({ message: e.message })
	}
}

export const search = async (req, res) => {
	try {
		const { name } = req.body
		let animal = null
		let animalCheck = await Model.find()
		let animalValue = animalCheck.filter(animal => new RegExp(`\\b${animal.name.toLowerCase()}`).test(name.toLowerCase()))

		if(animalValue.length != 0) {
			animal = await Model.findOne({ name })
			res.status(200).json(animal)
		}
		else res.status(200).json({ message: "Animal not found" })
	}
	catch(e) {
		res.status(400).json({ message: e.message })
	}
}


export const addAnimal = async (req, res) => {
	try {
		const dataBody = req.body
		const animal = new Model(dataBody)

		await animal.save()
		res.status(201).json(animal)
	}
	catch(e) {
		res.status(401).json({ message: e.message })
	}
}