import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  
  // NestJs da acesso a tabela de produtos no banco
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Metodo de criacao
  async create(createProductDto: CreateProductDto) {
    
    // Passo 1: Definir valores padrão se não vierem
    const taxRate = createProductDto.taxRate || 60; // Se não mandar taxa, assume 60%
    
    // Passo 2: Calcular Custo Total em Dólar (Produto + Frete)
    const totalCostUsd = createProductDto.costPriceUsd + createProductDto.shippingCostUsd;

    // Passo 3: Converter para Reais (Sem impostos ainda)
    const costBrl = totalCostUsd * createProductDto.exchangeRate;

    // Passo 4: Calcular o valor do imposto em Reais
    const taxAmountBrl = costBrl * (taxRate / 100);

    // Passo 5: Custo Real Final (Produto + Frete + Imposto)
    const finalCostBrl = costBrl + taxAmountBrl;

    // Passo 6: Aplicar a Margem de Lucro
    // Ex: Se custou 100 e quero 30% de margem -> 100 * (1 + 0.30) = 130
    const finalPrice = finalCostBrl * (1 + createProductDto.desiredMargin / 100);

    // Passo 7: Preparar o objeto para salvar
    // criiar uma "instância" do produto com os dados que o usuário mandou
    // adicionar o preço final que foi calculado.
    const product = this.productRepository.create({
      ...createProductDto, // Copia tudo que veio do DTO (name, sku, etc)
      finalPriceBrl: finalPrice, // Adiciona o cálculo
    });

    // Passo 8: Salvar no Banco
    return this.productRepository.save(product);
  }

  // --- Métodos Padrão (Leitura) ---

  findAll() {
    return this.productRepository.find(); // Traz tudo do banco
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({ id }); // Busca pelo ID
  }

  // --- Métodos de Atualização/Remoção ---

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}