import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikesModule } from './bikes/bikes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [BikesModule,TypeOrmModule.forRoot({
    type:"sqlite",
    database:"bikesDB",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
