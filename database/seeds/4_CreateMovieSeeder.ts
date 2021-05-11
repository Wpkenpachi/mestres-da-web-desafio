/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, getRepository, Repository } from 'typeorm'
import { Movie, MovieStatus } from '../../src/models/Movie'
import { Genre } from '../../src/models/Genre'
import Faker from 'faker'


export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Clear database
    await connection
    .createQueryBuilder()
    .delete()
    .from(Movie)
    .execute();

    const movieRepository: Repository<Movie> = getRepository(Movie)
    const genreRepository: Repository<Genre> = getRepository(Genre)
    const genres: Genre[] = await genreRepository.find({})

    const movies: Promise<Movie>[] = Array.from({ length: 20 }).map( (): Promise<Movie> => {
      const genreRandomId: number = Math.floor(Math.random() * genres.length)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const genre: Genre = genres[genreRandomId]
      return movieRepository.save({
        title: Faker.lorem.sentence(3),
        overview: Faker.lorem.text(),
        poster_path: Faker.internet.url(),
        release_date: new Date,
        now_on_cinema: true,
        on_cinema_until: new Date,
        genres: [genre],
        status: Faker.random.arrayElement([MovieStatus.WAITING])
      })
    })

    await Promise.all(movies)
  }
}