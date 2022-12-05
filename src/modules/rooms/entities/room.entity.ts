import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Floor } from 'src/modules/floors/entities/floor.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Room extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  square: string;

  @ManyToOne(() => Floor, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'floorId',
  })
  floor: Floor;

  @Column()
  maxStudentAllow: number;

  @Column()
  numberOfBed: number;

  @Column()
  numberOfAirConditional: number;

  @Column()
  numberOfFan: number;

  @Column()
  onlyForeign: boolean;

  @Column()
  onlyFemale: boolean;

  @Column({
    nullable: true,
  })
  note: string;

  @OneToMany(() => User, (user) => user.room)
  users: User[];
}
