import { connect } from 'mongoose'

const dbConnection = async () => {
  try {
    await connect(process.env.MONGODB_URI)
    console.log('DB Online')
  } catch (error) {
    console.log(error)
  }
}

export default dbConnection
