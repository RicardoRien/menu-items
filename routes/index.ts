import express from 'express'

import itemsRouter from './items.router'

export default function routerApi (app: express.Application): void {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/menu-items', itemsRouter)
} 
