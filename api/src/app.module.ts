import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Importante para ler variáveis
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // 1. Carrega as variáveis de ambiente (do .env ou do Render)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configura o Banco de Dados usando a URL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Pega a URL do Neon
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Em produção real, usariamos Migrations, mas para MVP ok.
      ssl: {
        rejectUnauthorized: false, // Necessário para conectar no Neon/Render com segurança
      },
    }),

    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}