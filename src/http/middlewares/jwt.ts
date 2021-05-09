/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { APP_KEY } from '../../config'
import { getTokenFromAuthorizationHeader } from '../../common/utils'

// Custom Repositories
import { getCustomRepository } from 'typeorm'
import { CheckUserRoleRepository } from '../../repositories/CheckUserRoleRepository'

export const isRefreshToken = (req: Request, res: Response, next: NextFunction): any | void => {
  const token = req.header("Authorization") as string
  if (!token) res.status(401).send('Unauthorized Request')
  jwt.verify(getTokenFromAuthorizationHeader(token), APP_KEY as string, (err) => {
    if (err && err.name == "TokenExpiredError") {
      return next()
    }
    return res.status(400).send('')
  })
}

export const isContentCreator = (req: Request, res: Response, next: NextFunction): any | void => {
  const token = req.header("Authorization") as string
  let statusCode = 200
  let responsePayload = {}

  if (!token) {
    statusCode = 401
    responsePayload = {
      err: 'Unauthorized Request'
    }
    return res.status(statusCode).json(responsePayload)
  }

  jwt.verify(getTokenFromAuthorizationHeader(token), APP_KEY as string, (err: any, decoded: any) => {
    if (err) {
      statusCode = 401
      responsePayload = {
        err: err?.name,
        message: err?.message
      }
    }
    const checkRoleRepository = getCustomRepository(CheckUserRoleRepository)
    checkRoleRepository.checkContentCreatorRole(decoded?.id as string).then( (userRole: any) => {
      return err ? res.status(statusCode).json(responsePayload) : next()
    })
  })
}

export const isContentManager = (req: Request, res: Response, next: NextFunction): any | void => {
  const token = req.header("Authorization") as string
  let statusCode = 200
  let responsePayload = {}

  if (!token) {
    statusCode = 401
    responsePayload = {
      err: 'Unauthorized Request'
    }
    return res.status(statusCode).json(responsePayload)
  }

  jwt.verify(getTokenFromAuthorizationHeader(token), APP_KEY as string, (err: any, decoded: any) => {
    if (err) {
      statusCode = 401
      responsePayload = {
        err: err?.name,
        message: err?.message
      }
    }
    const checkRoleRepository = getCustomRepository(CheckUserRoleRepository)
    checkRoleRepository.checkContentManagerRole(decoded?.id as string).then( (userRole: any) => {
      return err ? res.status(statusCode).json(responsePayload) : next()
    })
  })
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): any | void => {
  const token = req.header("Authorization") as string
  let statusCode = 200
  let responsePayload = {}

  if (!token) {
    statusCode = 401
    responsePayload = {
      err: 'Unauthorized Request'
    }
    return res.status(statusCode).json(responsePayload)
  }

  jwt.verify(getTokenFromAuthorizationHeader(token), APP_KEY as string, (err: any, decoded: any) => {
    if (err) {
      statusCode = 401
      responsePayload = {
        err: err?.name,
        message: err?.message
      }
    }
    const checkRoleRepository = getCustomRepository(CheckUserRoleRepository)
    checkRoleRepository.checkAdminRole(decoded?.id as string).then( (userRole: any) => {
      return err ? res.status(statusCode).json(responsePayload) : next()
    })
  })
}