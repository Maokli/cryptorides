import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { entityType } from '../enum/entityType.enum';

/**
 * Represents the entity/file association in db.
 */
@Entity('FileAssignmentsTable')
export class FileAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  fileUrl: string;

  /**
   * The id of the entity in the db that has this file.
   * Think of this attribute as a foreign key.
   */
  @Column({ type: 'integer', nullable: false })
  elementId: number;

  /**
   * An integer to distinguish the entity type ( ie: car or user ).
   * We leverage the value of this integer to know what table
   * should we query on to get the correct element by id.
   * Can also be used as an index to increase query perf.
   */
  @Column({ type: 'integer', nullable: false, enum: entityType })
  elementType: entityType;
}
