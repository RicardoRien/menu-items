import type { Request, Response, NextFunction } from "express"

export function boomErrorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

