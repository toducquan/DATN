import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Aspiration extends AbstractEntity {
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'studentId',
  })
  student: User;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'firstRoomId',
  })
  firstRoom: Room;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'secondRoomId',
  })
  secondRoom: Room;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'thirdRoomId',
  })
  thirdRoom: Room;
}
