import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
export class Hobby extends AbstractEntity {
  @Column({
    unique: true,
  })
  name: string;
}
