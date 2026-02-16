import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    
    const taxRate = createProductDto.taxRate || 60;
    
    const totalCostUsd = createProductDto.costPriceUsd + createProductDto.shippingCostUsd;

    const costBrl = totalCostUsd * createProductDto.exchangeRate;

    const taxAmountBrl = costBrl * (taxRate / 100);

    const finalCostBrl = costBrl + taxAmountBrl;

    const finalPrice = finalCostBrl * (1 + createProductDto.desiredMargin / 100);

    const product = this.productRepository.create({
      ...createProductDto,
      finalPriceBrl: finalPrice, 
    });

    return this.productRepository.save(product);
  }


  findAll() {
    return this.productRepository.find(); 
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id }); 
  }


  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const result = await this.productRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }
    return { message: 'Produto deletado com sucesso', id};
  }
}