import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";
import { Cat } from "./Cat";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column("jsonb", { default: [] })
  todos!: any[];

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @Column("jsonb", { default: [] })
  cats!: any[];

  @OneToMany(() => Cat, (cat) => cat.user)
  catsEntity!: Cat[];
}
