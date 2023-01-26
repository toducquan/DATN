import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RoomSwap extends AbstractEntity {
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'requestUserId',
  })
  requestUser: User;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'receiveUserId',
  })
  receiveUser: User;

  @Column('boolean', {
    default: false,
  })
  isApproveByReceiveUser: boolean;

  @Column('boolean', {
    default: false,
  })
  isApproveByAdmin: boolean;
}
