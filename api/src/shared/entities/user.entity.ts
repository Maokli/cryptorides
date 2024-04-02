import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from './car.entity';

@Entity('UsersTable')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  familyName: string;

  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ length: 50, nullable: true })
  phoneNumber: string;

  @OneToMany(() => Car, (car) => car.owner)
  carsCreatedByUser: Car[]

  /**
   * The hash of the password.
   * To identify a correct login we should compare hashes not raw passwords.
   */
  @Column({ nullable: false })
  passwordHash: string;

  /**
   * A random string of a constant length.
   * Before hashing the password we concat it with this salt and hash the result.
   * This is a mechanism to avoid hash collisions.
   */
  @Column({ nullable: false })
  passwordSalt: string;
}
