import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBikeDto } from 'src/bikes/dtos/create-bike.dto';
import { UpdateBikeDto } from 'src/bikes/dtos/update-bike.dto';
import { Bikes } from 'src/bikes/entities/bikes.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bikes) private bikesRepository: Repository<Bikes>, // Injects the Bikes repository for database access
  ) {}

  // Retrieves all bike records from the database
  async getAllBikes(): Promise<Bikes[]> {
    try {
      return await this.bikesRepository.find(); // Returns all bikes
    } catch (error) {
      console.error('Error in getAllBikes:', error); // Logs any errors encountered
      throw error;
    }
  }

  // Adds a new bike record to the database
  async addBike(bike: CreateBikeDto): Promise<Bikes> {
    try {
      return await this.bikesRepository.save(bike); // Saves the new bike data
    } catch (error) {
      console.error('Error in addBike:', error); // Logs any errors encountered
      throw error;
    }
  }

  // Retrieves a single bike record by its ID
  async getOneBike(id: number): Promise<Bikes> {
    try {
      const bike = await this.bikesRepository.findOne({ where: { id } }); // Finds a bike by ID
      if (!bike) {
        throw new Error(`Bike with id ${id} not found`); // Throws an error if bike not found
      }
      return bike;
    } catch (error) {
      console.error(`Error in getOneBike for id ${id}:`, error); // Logs any errors encountered
      throw error;
    }
  }

  // Updates a bike record by its ID
  async updateBike(id: number, bike: UpdateBikeDto): Promise<UpdateResult> {
    try {
      return await this.bikesRepository.update(id, bike); // Updates the bike data
    } catch (error) {
      console.error(`Error in updateBike for id ${id}:`, error); // Logs any errors encountered
      throw error;
    }
  }

  // Deletes a bike record by its ID
  async deleteBike(id: number): Promise<DeleteResult> {
    try {
      return await this.bikesRepository.delete(id); // Deletes the bike from the database
    } catch (error) {
      console.error(`Error in deleteBike for id ${id}:`, error); // Logs any errors encountered
      throw error;
    }
  }
}
