/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

export const index = async (req: Request, res: Response): Promise<any> => {
  res.json({
    message: 'Running :D!'
  })
}