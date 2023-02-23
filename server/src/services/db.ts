import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
const { MONGO_URI } = process.env

if(MONGO_URI !== undefined) {
  mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo'))
  .catch(err => console.error(err))
}
  