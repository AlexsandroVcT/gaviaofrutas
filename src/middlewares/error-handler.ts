import { ZodError } from "zod"
import { BadRequestError } from "../errors/bad-request-error"
import { UnauthorizedError } from "../errors/unauthorized-error"
import { NextFunction, Request, Response } from "express"

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      errors: error.flatten().fieldErrors,
      message: 'Validation error',
    })
  }
  if (error instanceof BadRequestError) {
    return res.status(400).send({
      message: error.message,
    })
  }
  if (error instanceof UnauthorizedError) {
    return res.status(401).send({
      message: error.message,
    })
  }
  console.error(error)
  return res.status(500).send({ message: 'Internal Server Error' })
}
