import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { entityType } from '../../shared/enum/entityType.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * Represents the entity/file association in db.
 * For better storage and retrieval of files in 
 * relation to their associated entities.
 * Use case : Image/File Uploads
 */
@ObjectType()
@Entity('FileAssignmentsTable')
export class FileAssignment {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255, nullable: false })
  fileUrl: string;

  /**
   * The id of the entity in the db that has this file.
   * Think of this attribute as a foreign key.
   */
  @Field(() => Int, { description: 'Id of the entity that has this file' })
  @Column({ type: 'integer', nullable: false })
  elementId: number;

  /**
   * An integer to distinguish the entity type ( ie: car or user ).
   * We leverage the value of this integer to know what table
   * should we query on to get the correct element by id.
   * Can also be used as an index to increase query perf.
   */
  @Field(() => entityType, { description: 'Element type enum : Car (1), User (1 << 1) ...' })
  @Column({ type: 'integer', nullable: false, enum: entityType })
  elementType: entityType;

}