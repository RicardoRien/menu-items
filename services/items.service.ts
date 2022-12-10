import { BaseItem, Item } from "../interfaces/item.interface"
import { items } from "../utils/data/index"

class ItemsService {
  findAll = async (query: any): Promise<Item[] | unknown> => {
    const { price } = query

    if (price) {
      const filterData = Object.entries(items)
      return filterData.filter(([_key, value]) => value.price === Number(price))
    }

    return Object.values(items)
  }

  find = async (id: number): Promise<Item> => items[id]

  create = async (newItem: BaseItem): Promise<Item> => {
    const id = new Date().valueOf()
    items[id] = {
      id,
      ...newItem,
    }
    return items[id]
  }

  update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {
    const item = await this.find(id)

    if (!item) return null

    items[id] = { id, ...itemUpdate }

    return items[id]
  }

  remove = async (id: number): Promise<null | void> => {
    const item = await this.find(id)

    if (!item) return null

    delete items[id]
  }

}

export default ItemsService
