import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Informacao do objeto que eh relacionado
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  // Essa eh a coluna no banco de dados mesmo
  @Column()
  user_id: string;

  // Essa coluna nao eh transferida para o banco de dados... eh mais um relacionamento que existe so no JS na programacao
  // Informacao do objeto que eh relacionado
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
