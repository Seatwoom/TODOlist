import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("cats")
export class Cat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column("jsonb", { default: {} })
  breed!: object;

  @ManyToOne(() => User, (user) => user.cats)
  user!: User;
}
