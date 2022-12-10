import type { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom'

function validatorHandler(schema: any, property: keyof Request) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

export { validatorHandler }
