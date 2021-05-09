import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Genre } from './Genre'

export enum MovieStatus {
  WAITING = 'WAITING',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED'
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title?: string;

  @Column()
  overview?: string;

  @Column()
  poster_path?: string;

  @Column()
  release_date?: Date;

  @Column({
    default: true
  })
  now_on_cinema?: boolean;

  @Column({
    nullable: true
  })
  on_cinema_until?: Date;

  @ManyToMany(() => Genre, { eager: true })
  @JoinTable({
    name: 'movie_genres',
    joinColumn: {
        name: "movieId",
        referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "genreId",
        referencedColumnName: "id"
    }
  })
  genres?: Genre[];

  @Column({
      type: "enum",
      enum: MovieStatus,
      default: MovieStatus.WAITING
  })
  status?: MovieStatus
}