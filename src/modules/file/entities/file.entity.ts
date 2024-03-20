import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: false })
  size: number;

  @ManyToOne(() => CarEntity, (car) => car.files, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @OneToOne(() => UserEntity, (user) => user.avatar)
  user: UserEntity;
}
