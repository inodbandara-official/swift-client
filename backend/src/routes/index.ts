import { Router } from 'express'
import ordersRouter from './orders'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'SwiftTrack API' })
})

router.use('/orders', ordersRouter)

export default router
