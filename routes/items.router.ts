import express from 'express'
import type { Request, Response } from 'express';
import { BaseItem, Item } from '../interfaces/item.interface'
import ItemsService from '../services/items.service'
import { createItemSchema, getItemSchema, updateItemSchema } from '../schemas/items.schemas'
import { validatorHandler } from '../middleware/validator.handler'

const router = express.Router()
const service = new ItemsService()

router.get("/", async (req: Request, res: Response) => {
  try {
    const items: any = await service.findAll(req.query)
    res.status(200).send(items)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
})

router.get("/:id",
  validatorHandler(getItemSchema, 'params'),
  async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const item: Item = await service.find(+id)

    if (item) {
      return res.status(200).send(item)
    }

    return res.status(404).send("item not found")

  } catch (error) {
    return res.status(500).send((error as Error).message)
  }
})

router.post("/",
  validatorHandler(createItemSchema, 'body'),
  async (req: Request, res: Response) => {
    try {
      const item: BaseItem = req.body

      const newItem = await service.create(item)

      res.status(201).json(newItem)
    } catch (error) {
      res.status(500).send((error as Error).message)
    }
  })

router.put("/:id",
  validatorHandler(getItemSchema, 'params'),
  validatorHandler(updateItemSchema, 'body'),
  async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const itemUpdate: Item = req.body
      const existingItem: Item = await service.find(+id)

      if (existingItem) {
        const updatedItem = await service.update(+id, itemUpdate)
        return res.status(201).json(updatedItem)
      }

      const newItem = await service.create(itemUpdate)

      return res.status(201).json(newItem)
    } catch (error) {
      return res.status(500).send((error as Error).message)
    }
  })

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await service.remove(+id)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send((error as Error).message)
  }
})

export default router
