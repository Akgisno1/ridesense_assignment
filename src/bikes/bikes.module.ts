import { Module } from '@nestjs/common';
import { BikesController } from './controller/bikes/bikes.controller';
import { BikesService } from './service/bikes/bikes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bikes } from './entities/bikes.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bikes])],
  controllers: [BikesController],
  providers: [BikesService],
})
export class BikesModule {}
