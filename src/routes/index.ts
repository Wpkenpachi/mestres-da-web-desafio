import { Request, Response, Router } from 'express'
const route = Router()
import { isContentCreator, isAdmin, isContentManager, isRefreshToken } from '../http/middlewares/jwt'
import { index } from '../http/controllers/HomeController'
import * as UserController from '../http/controllers/UserController'
import * as AuthController from '../http/controllers/AuthController'
import * as MovieController from '../http/controllers/MovieController'
import { validate, ValidationError } from 'express-validation'
import { loginValidation, refreshTokenValidation } from '../http/validators/auth'
import { authorizeMovieValidation, listPublicMoviesValidation, storeMovieValidation } from '../http/validators/movies'

const validationOptions = {
  context: true,
  keyByField: true
}

route.get('/', index)

// ADMIN
route.post('/user', isAdmin, UserController.store)

// Refresh Token
route.get('/refresh/token', isRefreshToken, validate(refreshTokenValidation), AuthController.refreshToken)


// Public
route.post('/login', validate(loginValidation), AuthController.login)
route.get('/movie', validate(listPublicMoviesValidation), MovieController.listPublicMovies)


// Movies [Creator]
route.post('/movie', isContentCreator, validate(storeMovieValidation), MovieController.store)


// Movies [Manager]
route.post('/movie/authorize', isContentManager, validate(authorizeMovieValidation), MovieController.authorizeMovie)
route.get('/movie/waiting', isContentManager, MovieController.listWaitingMovies)

export default route