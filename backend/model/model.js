import mongoose from 'mongoose'

const fourLeggedSchema = mongoose.Schema({
	name: String,
	description: String,
	image: String
})

export default mongoose.model("Four Legged", fourLeggedSchema)