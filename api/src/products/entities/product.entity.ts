import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ nullable: true })
  supplierUrl: string;

  // --- Custos (USD) ---
  @Column('decimal', { precision: 10, scale: 2 })
  costPriceUsd: number; 

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  shippingCostUsd: number;

  // --- Configurações ---
  @Column('decimal', { precision: 5, scale: 2, default: 60.00 })
  taxRate: number; // Ex: 60%

  // --- Economia ---
  @Column('decimal', { precision: 10, scale: 4 })
  exchangeRate: number; // Ex: 5.85

  @Column('decimal', { precision: 5, scale: 2 })
  desiredMargin: number; // Ex: 30%

  // --- Resultado (BRL) ---
  @Column('decimal', { precision: 10, scale: 2 })
  finalPriceBrl: number; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}