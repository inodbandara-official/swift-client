import { Router } from 'express'
import { listOrders } from '../controllers/ordersController'

const router = Router()

router.get('/', listOrders)

export default router
