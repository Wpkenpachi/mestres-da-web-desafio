import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RoleTypes {
  ADMIN = 'admin',
  CONTENT_CREATOR = 'content_creator',
  CONTENT_MANAGER = 'content_manager'
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @Column({
    unique: true
  })
  slug?: string;
}