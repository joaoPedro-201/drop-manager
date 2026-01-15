// importando os validadores da biblioteca instalada
import { IsString, IsNumber, IsPositive, IsOptional, IsUrl } from 'class-validator';

export class CreateProductDto {
  
  // --- Dados Básicos ---
  
  @IsString() // Garante que o nome seja texto
  name: string;

  @IsOptional() // O SKU não é obrigatório
  @IsString()
  sku?: string;

  @IsOptional()
  @IsUrl() // Verifica se é um link válido (http://...)
  supplierUrl?: string;

  // --- Dados Financeiros ---

  @IsNumber() // Tem que ser número
  @IsPositive() // Não existe preço negativo
  costPriceUsd: number;

  @IsNumber()
  // Aqui permitimos 0 (frete grátis), então não usamos @IsPositive
  shippingCostUsd: number;

  @IsOptional() // Se não mandar, usamos o padrão do banco (60%)
  @IsNumber()
  taxRate?: number;

  // --- Cotação e Lucro ---

  @IsNumber()
  @IsPositive()
  exchangeRate: number; // Quanto está o dólar hoje?

  @IsNumber()
  desiredMargin: number; // Margem de lucro (ex: 30%)
}