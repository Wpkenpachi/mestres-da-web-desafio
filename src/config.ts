import dotenv from 'dotenv'
dotenv.config()

export const {
  PORT,
  APP_KEY,
  JWT_EXPIRE_TIME
} = process.env
