import type { Request, Response, NextFunction } from "express"
import { HttpException } from "../common/http-exception"

export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500

  response.status(status).send(error)
};
