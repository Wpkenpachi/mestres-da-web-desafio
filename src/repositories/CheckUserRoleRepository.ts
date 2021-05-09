/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
export class CheckUserRoleRepository extends Repository<User> {

    async checkContentCreatorRole(userId: string): Promise<any> {
      return await this.createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .where("user.id = :userId", { userId })
        .andWhere("role.slug = :slug", { slug: 'content_creator' })
        .getOne();
    }

    async checkContentManagerRole(userId: string): Promise<any> {
      return await this.createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .where("user.id = :userId", { userId })
        .andWhere("role.slug = :slug", { slug: 'content_manager' })
        .getOne();
    }

    async checkAdminRole(userId: string): Promise<any> {
      return await this.createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .where("user.id = :userId", { userId })
        .andWhere("role.slug = :slug", { slug: 'admin' })
        .getOne();
    }

}