import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // .env dosyasındaki değişkenleri yüklerConfig();
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DATABASE'),
      entities: [__dirname + '/../../**/*.entity.{js,ts}'],
      autoLoadEntities: true, // entity dosyalarını bulup otomatik yükler.
      synchronize: true, //in the production set to false
      subscribers: [__dirname + '/../../**/*.subscriber.{js,ts}'],
      // logging: true,
    };
  }
}
