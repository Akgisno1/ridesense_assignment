import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bikes } from 'src/bikes/entities/bikes.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BikesService {

    constructor(
        @InjectRepository(Bikes) private BikesRepository:Repository<Bikes>,
    ){}

    async getAllBikes():Promise<Bikes[]>{
        return await this.BikesRepository.find();
    }

    async addBikes(bikes:Bikes):Promise<Bikes>{
        return await this.BikesRepository.save(bikes);
    }

    async getOneBikes(id:number):Promise<Bikes>{
        return await this.BikesRepository.findOne({where:{id}});
    }

    async updateBikes(id:number,bikes:Bikes):Promise<UpdateResult>{
        return await this.BikesRepository.update(id,bikes);
    }

    async deleteBikes(id:number):Promise<DeleteResult>{
        return await this.BikesRepository.delete(id);
    }
}
