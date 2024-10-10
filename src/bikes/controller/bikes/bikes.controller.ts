import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Bikes } from 'src/bikes/entities/bikes.entity';
import { BikesService } from 'src/bikes/service/bikes/bikes.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('bikes')
export class BikesController {

    constructor(private bikesService:BikesService){}

    @Get()
    async getAllBikes():Promise<Bikes[]>{
        return await this.bikesService.getAllBikes();
    }
    @Get(':id')
    async getOneBikes(@Param('id') id:number):Promise<Bikes>{
        return await this.bikesService.getOneBikes(id);
    }
    @Post()
    async addBikes(@Body() bikes:Bikes):Promise<Bikes>{
    return await this.bikesService.addBikes(bikes);
    }
    @Put(':id')
    async updateBikes(@Param('id') id:number,@Body() bikes:Bikes):Promise<UpdateResult>{
        return await this.bikesService.updateBikes(id,bikes);
    }
    @Delete(':id')
    async deleteBikes(@Param('id') id:number):Promise<DeleteResult>{
        return await this.bikesService.deleteBikes(id);
    }


}
