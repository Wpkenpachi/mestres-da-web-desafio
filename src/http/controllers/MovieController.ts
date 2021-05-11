/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Movie, MovieStatus, MovieOrderByAttributes } from '../../models/Movie'
import { Genre } from '../../models/Genre'

export const store = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
  const newMovie = req.body.movie
  const genreSlugs: string[] = req.body.genres
  try {
    const movieRepository = getRepository(Movie)
    const genresRepository = getRepository(Genre)

    const genresObjects = genreSlugs.map( slug => {
      return { slug }
    })

    // Get only genres that exist on database
    const validGenres = await genresRepository.find({
      where: genresObjects
    })

    newMovie.genres = validGenres
    const createdMovie = await movieRepository.save(newMovie)
    return res.status(201).json(createdMovie)
  } catch (error) {
    console.log('Segue a rota cuzao')
    next(error)
  }
}

export const authorizeMovie = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
  const { movie_id, on_cinema_until } = req.body
  const movieRepository = getRepository(Movie)
  try {
    await movieRepository.update({ id: movie_id }, { status: MovieStatus.AUTHORIZED, on_cinema_until })
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export const listWaitingMovies = async (req: Request, res: Response): Promise<Response> => {
  const movieRepository = getRepository(Movie)
  const movieList = await movieRepository.find({ status: MovieStatus.WAITING })
  return res.json(movieList)
}

export const listPublicMovies = async (req: Request, res: Response): Promise<Response> => {
  // Getting request params/query/body
  const skip: number = Number(req.query.skip) || 0
  const take: number = Number(req.query.take) || 0
  const orderByDirectionQS = req.query.orderDirection || 'asc'
  const orderByQS = req.query.orderBy as string || MovieOrderByAttributes.RELEASE_DATE

  // OrderBy KeyValue
  const orderByKeyValue = new Map()
  orderByKeyValue.set(orderByQS, orderByDirectionQS)


  const movieRepository = getRepository(Movie)
  const movieList = await movieRepository.find({ where: { status: MovieStatus.WAITING }, take, skip, order: orderByKeyValue.get(orderByQS)})
  const response = {
    data: movieList,
    pagination: {
      skip: (skip + take),
      take
    }
  }
  return res.json(response)
}