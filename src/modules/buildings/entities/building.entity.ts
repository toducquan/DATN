import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Building extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  numberOfFloors: string;

  @Column()
  images: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'managerId',
  })
  manager: User;
}
