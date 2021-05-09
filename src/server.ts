import app from './app'
import { createConnection } from "typeorm";
import { PORT } from '../src/config'

app.listen(PORT, async () => {
  await createConnection()
  console.log(`Server running at ${PORT}`)
})