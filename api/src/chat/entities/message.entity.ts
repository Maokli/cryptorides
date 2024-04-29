/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from "src/shared/entities/user.entity";

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @ManyToOne(() => User, { eager: true }) 
  @JoinColumn({ name: 'senderId' })
  @Field(() => User)
  sender: User;

  @ManyToOne(() => User, { eager: true }) // Many messages can be associated with one receiver
  @JoinColumn({ name: 'receiverId' })
  @Field(() => User)
  receiver: User;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;
}
