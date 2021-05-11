/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role, RoleTypes } from '../../src/models/Role'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Clear Database
    await connection
    .createQueryBuilder()
    .delete()
    .from(Role)
    .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        { name: 'Admin', slug: RoleTypes.ADMIN },
        { name: 'Content Creator', slug: RoleTypes.CONTENT_CREATOR },
        { name: 'Content Manager', slug: RoleTypes.CONTENT_MANAGER },
      ])
      .execute()
  }
}