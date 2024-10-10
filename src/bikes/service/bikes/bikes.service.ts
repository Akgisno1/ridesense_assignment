import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBikeDto } from 'src/bikes/dtos/create-bike.dto';
import { UpdateBikeDto } from 'src/bikes/dtos/update-bike.dto';
import { Bikes } from 'src/bikes/entities/bikes.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bikes) private bikesRepository: Repository<Bikes>,
  ) {}

  async getAllBikes(): Promise<Bikes[]> {
    try {
      return await this.bikesRepository.find();
    } catch (error) {
      console.error('Error in getAllBikes:', error);
      throw error;
    }
  }

  async addBike(bike: CreateBikeDto): Promise<Bikes> {
    try {
      return await this.bikesRepository.save(bike);
    } catch (error) {
      console.error('Error in addBike:', error);
      throw error;
    }
  }

  async getOneBike(id: number): Promise<Bikes> {
    try {
      const bike = await this.bikesRepository.findOne({ where: { id } });
      if (!bike) {
        throw new Error(`Bike with id ${id} not found`);
      }
      return bike;
    } catch (error) {
      console.error(`Error in getOneBike for id ${id}:`, error);
      throw error;
    }
  }

  async updateBike(id: number, bike: UpdateBikeDto): Promise<UpdateResult> {
    try {
      return await this.bikesRepository.update(id, bike);
    } catch (error) {
      console.error(`Error in updateBike for id ${id}:`, error);
      throw error;
    }
  }

  async deleteBike(id: number): Promise<DeleteResult> {
    try {
      return await this.bikesRepository.delete(id);
    } catch (error) {
      console.error(`Error in deleteBike for id ${id}:`, error);
      throw error;
    }
  }
}
