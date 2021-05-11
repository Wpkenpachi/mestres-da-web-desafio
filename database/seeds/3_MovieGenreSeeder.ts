/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Genre } from '../../src/models/Genre'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Clear database
    // Clear Database
    await connection
    .createQueryBuilder()
    .delete()
    .from(Genre)
    .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Genre)
      .values([
        { name: 'Drama', slug: 'drama' },
        { name: 'Terror', slug: 'terror' },
        { name: 'Adventure', slug: 'adventure' },
        { name: 'Comedy', slug: 'slug' }
      ])
      .execute()
  }
}