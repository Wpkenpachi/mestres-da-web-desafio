/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Joi } from 'express-validation'
import { getEnumValues } from '../../common/utils'
import { MovieOrderByAttributes } from '../../models/Movie'

export const storeMovieValidation = {
  body: Joi.object({
    movie: Joi.object({
      title: Joi.string().required(),
      overview: Joi.string().required(),
      poster_path: Joi.string().required(),
      release_date: Joi.string().required()
    }).required(),
    genres: Joi.array().items(Joi.string()).required()
  })
}

export const authorizeMovieValidation = {
  body: Joi.object({
    movie_ids: Joi.array().items(Joi.string())
  })
}

export const listPublicMoviesValidation = {
  query: Joi.object({
    skip: Joi.number(),
    take: Joi.number(),
    orderBy: Joi.string().valid(...getEnumValues(MovieOrderByAttributes)),
    orderDirection: Joi.string().valid('asc', 'desc')
  })
}