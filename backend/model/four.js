import mongoose from 'mongoose'

const allFourLeggedSchema = mongoose.Schema({
	name: String
})

export default mongoose.model("All Four Legged Animals", allFourLeggedSchema)