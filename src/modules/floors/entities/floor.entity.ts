import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Building } from 'src/modules/buildings/entities/building.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Floor extends AbstractEntity {
  @ManyToOne(() => Building, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'buildingId',
  })
  building: Building;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'managerId',
  })
  manager: User;

  @Column()
  name: string;
}
