import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { verifyDatabaseConnection } from './config/db'
import apiRouter from './routes'

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'swifttrack-backend' })
})

app.use('/api', apiRouter)

const port = process.env.PORT ? Number(process.env.PORT) : 4000

async function start() {
  try {
    await verifyDatabaseConnection()
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
