import { BaseEntity } from 'src/common/database/base.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('parks')
export class ParkEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 64,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'capacity',
    type: 'int',
    nullable: false,
  })
  capacity: number;

  @Column({
    name: 'price',
    type: 'int',
    nullable: false,
  })
  price: number;

  @ManyToMany(() => UserEntity, (user) => user.parks)
  users: Array<UserEntity>;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.park)
  transactions: Array<TransactionEntity>;
}
