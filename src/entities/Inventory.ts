import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'product_id', type: 'bigint', unique: true })
  productId!: string;

  @OneToOne(() => Product, (product) => product.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ name: 'stock_quantity', type: 'numeric', precision: 10, scale: 3, nullable: true })
  stockQuantity!: string | null;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable!: boolean;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
