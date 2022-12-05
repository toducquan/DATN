import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Gender } from 'src/enums/gender.enum';
import { Major } from 'src/enums/major.enum';
import { Region } from 'src/enums/region.enum';
import { Religion } from 'src/enums/religion.enum';
import { Role } from 'src/enums/role.enum';
import { Hobby } from 'src/modules/hobbies/entities/hobby.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column()
  gender: Gender;

  @Column()
  isSmoking: boolean;

  @Column({
    default: Religion.None,
  })
  religion: Religion;

  @Column({
    default: Region.VietNam,
  })
  region: Region;

  @Column({
    default: Role.USER,
  })
  role: Role;

  @Column()
  age: string;

  @Column({
    unique: true,
    nullable: true,
  })
  studentId: string;

  @Column({
    nullable: true,
  })
  fatherName: string;

  @Column({
    nullable: true,
  })
  fatherAge: string;

  @Column({
    nullable: true,
    unique: true,
  })
  fatherEmail: string;

  @Column({
    nullable: true,
    unique: true,
  })
  fatherPhone: string;

  @Column({
    nullable: true,
    unique: true,
  })
  fatherOccupation: string;

  @Column({
    nullable: true,
  })
  motherName: string;

  @Column({
    nullable: true,
  })
  motherAge: string;

  @Column({
    nullable: true,
    unique: true,
  })
  motherEmail: string;

  @Column({
    nullable: true,
    unique: true,
  })
  motherPhone: string;

  @Column({
    nullable: true,
    unique: true,
  })
  motherOccupation: string;

  @Column({
    nullable: true,
  })
  grade: string;

  @ManyToMany(() => Hobby)
  @JoinTable()
  hobbies: Hobby[];

  @Column({
    type: 'enum',
    enum: Major,
    nullable: true,
  })
  major: Major;

  @ManyToOne(() => Room, (room) => room.users, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'roomId',
  })
  room: Room;
}
