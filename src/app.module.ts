import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    DomainModule,
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
