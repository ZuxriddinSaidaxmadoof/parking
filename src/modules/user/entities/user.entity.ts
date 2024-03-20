import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ParkEntity } from 'src/modules/park/entities/park.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'phone_number', type: 'text', unique: true, nullable: false })
  phoneNumber: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: RoleEnum, nullable: false })
  role: RoleEnum;

  @Column({ name: 'balance', type: 'int', nullable: false, default: 0 })
  balance: number;

  @OneToMany(() => CarEntity, (car) => car.owner)
  cars: Array<CarEntity>;

  @OneToOne(() => FileEntity, (file) => file.user)
  @JoinColumn({ name: 'file_id' })
  avatar: FileEntity;

  @ManyToMany(() => ParkEntity, (park) => park.users)
  @JoinTable({
    name: 'user_parks',
    joinColumn: { name: 'park_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  parks: Array<ParkEntity>;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: Array<TransactionEntity>;
}
