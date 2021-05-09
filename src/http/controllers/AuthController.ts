/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../../models/User'
import jwt from 'jsonwebtoken'
import { APP_KEY, JWT_EXPIRE_TIME } from '../../config'

import { getTokenFromAuthorizationHeader, checkPassword } from '../../common/utils'

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  // Check user on database
  // storing new user
  const userRepository = getRepository(User)
  const user = await userRepository.findOne({email})
  const passMatch = await checkPassword(password, user?.password as string)

  try {
    if (user && passMatch) {
      delete user.password
      const accessToken: string = jwt.sign({...user}, APP_KEY as string, {
        expiresIn: Number(JWT_EXPIRE_TIME)
      })
      return res.json({
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: accessToken
      })
    } else if (!passMatch) {
      return res.status(401).send()
    }

    return res.status(404).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error
    })
  }
}

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  const bearerToken = req.header("Authorization") as string
  const token = getTokenFromAuthorizationHeader(bearerToken)
  jwt.verify(token, APP_KEY as string, (err, decoded) => {
    const originalDecoded: any = decoded || jwt.decode(token, {complete: true});
    const payload = {...originalDecoded?.payload}
    const { id, name, email } = payload
    const accessToken: string = jwt.sign({ id, name, email }, APP_KEY as string, {
      expiresIn: Number(JWT_EXPIRE_TIME)
    })
    res.json({
      accessToken: accessToken
    })
  })
}