import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
export class Major extends AbstractEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  code: string;
}
