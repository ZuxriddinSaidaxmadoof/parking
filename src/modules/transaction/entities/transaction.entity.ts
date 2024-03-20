import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { ParkEntity } from 'src/modules/park/entities/park.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ name: 'entered_at', type: 'timestamp', nullable: false })
  enteredAt: Date;

  @Column({ name: 'left_at', type: 'timestamp', nullable: true })
  leftAt: Date;

  @Column({ name: 'total_price', type: 'int', nullable: true })
  totalPrice: number;

  @Column({ name: 'user_docs', type: 'json', nullable: false })
  userDocs: UserEntity;

  @Column({ name: 'car_docs', type: 'json', nullable: false })
  carDocs: CarEntity;

  @ManyToOne(() => UserEntity, (user) => user.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (car) => car.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => ParkEntity, (park) => park.transactions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'park_id' })
  park: ParkEntity;
}
