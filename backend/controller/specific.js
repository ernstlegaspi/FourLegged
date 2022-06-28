import AllAnimals from '../model/four.js'
import Model from '../model/model.js'

export const getEnterSentence = async (req, res) => {
	try {
		const { name } = req.body
		const data = null
		const animals = await AllAnimals.find()
		const anims = await Model.find()

		// anims.filter(animal => )
		console.log(new RegExp("^word").test("word"))

		res.status(200).json(name)
	}
	catch(e) {
		res.status(400).json({ message: e.message })
	}
}