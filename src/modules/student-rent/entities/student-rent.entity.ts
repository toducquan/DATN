import { AbstractEntity } from 'src/abstracts/entity.abstract';
import { Rent } from 'src/modules/rents/entities/rent.entity';
import { User } from 'src/modules/users/entity/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class StudentRent extends AbstractEntity {
  @Column({
    default: false,
  })
  paid: boolean;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'studentId',
  })
  student: User;

  @ManyToOne(() => Rent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'rentId',
  })
  rent: Rent;
}
