import { Router } from 'express'
const route = Router()
import { isContentCreator, isAdmin, isContentManager, isRefreshToken } from '../http/middlewares/jwt'
import { index } from '../http/controllers/HomeController'
import * as UserController from '../http/controllers/UserController'
import * as AuthController from '../http/controllers/AuthController'
import * as MovieController from '../http/controllers/MovieController'

route.get('/', index)

route.post('/user', UserController.store)
route.post('/login', AuthController.login)
route.get('/refresh/token', isRefreshToken, AuthController.refreshToken)

route.get('/test', function (req, res) {
  console.log((req.header('Authorization') as string))
  res.json()
})

// Movies
route.post('/movie', isContentCreator, MovieController.store)


// Checking Authentications
route.get('/isadmin', isAdmin, (req, res) => {
  res.json({
    message: 'Authenticated Admin!'
  })
})

route.get('/iscreator', isContentCreator, (req, res) => {
  res.json({
    message: 'Authenticated Content Creator!'
  })
})

route.get('/ismanager', isContentManager, (req, res) => {
  res.json({
    message: 'Authenticated Content Creator!'
  })
})

export default route