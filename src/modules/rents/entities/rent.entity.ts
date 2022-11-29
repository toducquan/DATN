import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Building } from 'src/modules/buildings/entities/building.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Rent extends AbstractEntity {
  @Column()
  cost: number;

  @ManyToOne(() => Building, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'buildingId',
  })
  building: Building;
}
