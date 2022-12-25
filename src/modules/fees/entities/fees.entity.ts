import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { FeeType } from 'src/enums/fee.enum';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Fee extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  cost: number;

  @Column({
    type: 'enum',
    enum: FeeType,
  })
  type: FeeType;

  @Column({
    nullable: true,
  })
  deadline: Date;

  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'roomId',
  })
  room: Room;
}
