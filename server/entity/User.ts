const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column("jsonb", { default: [] })
  todos!: object[];

  @Column("jsonb", { default: [] })
  cats!: object[];
}
