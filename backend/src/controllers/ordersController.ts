import type { Request, Response } from 'express'

export async function listOrders(req: Request, res: Response) {
  const userId = String(req.query.userId || 'unknown')
  const demo = [
    { id: '1', reference: `ST-${userId}-001`, status: 'received', createdAt: new Date().toISOString() },
    { id: '2', reference: `ST-${userId}-002`, status: 'processing', createdAt: new Date().toISOString() },
    { id: '3', reference: `ST-${userId}-003`, status: 'delivering', createdAt: new Date().toISOString() },
  ]
  res.json(demo)
}
