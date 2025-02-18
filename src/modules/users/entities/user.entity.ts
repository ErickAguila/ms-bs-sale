import { Product } from 'src/modules/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'cliente',
  SELLER = 'vendedor',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.CLIENT,
    length: 20,
  })
  role: UserRole;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  //Crear una relación uno a muchos con la entidad Product y que sea bidireccional
  @OneToMany(() => Product, (product) => product.userId)
  products: Product[];
}
