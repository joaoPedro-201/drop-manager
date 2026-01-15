import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',      // Definimos no docker-compose
      password: 'admin123',   // Definimos no docker-compose
      database: 'drop_manager', // Definimos no docker-compose
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Cria as tabelas sozinho (ótimo para dev, perigoso em produção)
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}