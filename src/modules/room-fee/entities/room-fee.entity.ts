import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Fee } from 'src/modules/fees/entities/fees.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RoomFee extends AbstractEntity {
  @ManyToOne(() => Fee)
  fee: Fee;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => User)
  student: User;

  @Column({
    default: false,
  })
  paid: boolean;
}
