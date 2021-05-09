/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Movie } from '../../models/Movie'
import { Genre } from '../../models/Genre'

export const store = async (req: Request, res: Response): Promise<Response> => {
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
    console.log(error)
    return res.status(500).json(error)
  }
}

export const authorizeMovie = async (req: Request, res: Response): Promise<Response> => {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { status, movie_ids } = req.body

  return res.json()
}