/* eslint-disable @typescript-eslint/no-explicit-any */
import { Factory, Seeder } from 'typeorm-seeding'
import { Connection, getRepository } from 'typeorm'
import { User } from '../../src/models/User'
import { Role, RoleTypes } from '../../src/models/Role'
import bcrypt from 'bcrypt'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Clear database
    // Clear Database
    await connection
    .createQueryBuilder()
    .delete()
    .from(User)
    .execute();

    const roleRepository = getRepository(Role)
    const adminRole = await roleRepository.findOne({ slug: RoleTypes.ADMIN })
    const creatorRole = await roleRepository.findOne({ slug: RoleTypes.CONTENT_CREATOR })
    const managerRole = await roleRepository.findOne({ slug: RoleTypes.CONTENT_MANAGER })

    const password = (pass: string): string => bcrypt.hashSync(pass, 10)

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: 'João', email: 'joao@gmail.com', password: password('123'), role: adminRole },
        { name: 'Claudio', email: 'claudio@gmail.com', password: password('123'), role: creatorRole },
        { name: 'Adalberto', email: 'adalberto@gmail.com', password: password('123'), role: managerRole }
      ])
      .execute()
  }
}