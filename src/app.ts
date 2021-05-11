/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import express, { Request, Response } from 'express'
import cors from 'cors'
import route  from './routes'
import { ValidationError } from "express-validation";
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', route)

app.use(function(err: ValidationError, req: Request, res: Response): Response {
  console.log('AAAAAAAAAAAAAAA')
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err.details.body)
  }
  return res.status(500).send()
})

export default app