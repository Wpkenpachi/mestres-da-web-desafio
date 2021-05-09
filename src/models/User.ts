import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name?: string;

    @Column({
      unique: true
    })
    email?: string;

    @Column()
    password?: string;

    @ManyToOne(() => Role, role => role.id)
    role?: Role
}