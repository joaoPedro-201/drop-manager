import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- 1. Importe isso
import { Product } from './entities/product.entity'; // <--- 2. Importe sua entidade

@Module({
  imports: [
    // 3. Adicione esta linha:
    // Isso diz: "Neste módulo, libere o acesso ao repositório da tabela Product"
    TypeOrmModule.forFeature([Product]), 
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}