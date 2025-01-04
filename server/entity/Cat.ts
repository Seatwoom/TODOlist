import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('cats')
export class Cat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  url!: string;

  @Column('jsonb', { default: {} })
  breed!: object;

  @ManyToOne(() => User, (user) => user.catsEntity)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
