import Joi from "joi"

const id = Joi.number().integer()
const name = Joi.string().min(3).max(25)
const price = Joi.number().min(10)
const price_min = Joi.number().integer()
const price_max = Joi.number().integer()
const description = Joi.string().min(4)
const image = Joi.string().uri()

export const createItemSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
})

export const updateItemSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image
})

export const getItemSchema = Joi.object({
  id: id.required(),
})

export const queryItemSchema = Joi.object({
  price,
  price_min,
  price_max: price_max.greater(Joi.ref('price_min')),
})
  .with('price_min', 'price_max')
  .with('price_max', 'price_min')
