import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Building } from 'src/modules/buildings/entities/building.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Room extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  square: string;

  @ManyToOne(() => Building, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'buildingId',
  })
  building: Building;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'managerId',
  })
  manager: User;

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
