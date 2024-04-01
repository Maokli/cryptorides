import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('CarsTahle')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  location: string;

  @Column({ length: 255, nullable: false })
  brand: string;

  @Column({ length: 255, nullable: false })
  color: string;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'float', nullable: false })
  rentalPrice: number;

  @Column({ type: 'float', nullable: false })
  downPayment: number;

  @ManyToOne(() => User, (user) => user.carsCreatedByUser)
  owner: User
}
