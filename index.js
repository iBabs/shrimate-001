import express from 'express'
import dotenv from 'dotenv'
import studentRouter from './routes/studentsRoute.js'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/userRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.use('/api/students',studentRouter) // http://firebase.gcp.cloud/api/v1/student
app.use('/api/auth', userRoute)

const PORT = process.env.PORT

app.listen(PORT, (err) => {
    console.log('listening at ' + PORT)
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log(err)
})