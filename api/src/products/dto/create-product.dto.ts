import { IsString, IsNumber, IsPositive, IsOptional, IsUrl } from 'class-validator';

export class CreateProductDto {
  
  
  @IsString() 
  name: string;

  @IsOptional() 
  @IsString()
  sku?: string;

  @IsOptional()
  @IsUrl() 
  supplierUrl?: string;


  @IsNumber() 
  @IsPositive() 
  costPriceUsd: number;

  @IsNumber()
  shippingCostUsd: number;

  @IsOptional()
  @IsNumber()
  taxRate?: number;

  @IsNumber()
  @IsPositive()
  exchangeRate: number; 

  @IsNumber()
  desiredMargin: number; 
}