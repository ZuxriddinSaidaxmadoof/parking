import { BaseEntity } from 'src/common/database/base.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('cars')
export class CarEntity extends BaseEntity {
  @Column({
    name: 'index',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  index: string;

  @Column({ name: 'docs', type: 'json', nullable: true })
  docs: object;

  @ManyToOne(() => UserEntity, (user) => user.cars, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @OneToMany(() => FileEntity, (file) => file.car)
  files: Array<FileEntity>;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.car)
  transactions: Array<TransactionEntity>;
}
