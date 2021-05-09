import "reflect-metadata";
import express from 'express'
import cors from 'cors'
import route from './routes'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', route)

export default app