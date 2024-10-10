import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Bikes } from 'src/bikes/entities/bikes.entity';
import { BikesService } from 'src/bikes/service/bikes/bikes.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Response } from 'express';

@Controller('bikes')
export class BikesController {
  constructor(private bikesService: BikesService) {}

  @Get()
  async getAllBikes(@Res() res: Response): Promise<Response> {
    try {
      const bikes = await this.bikesService.getAllBikes();
      return res.status(200).json(bikes);
    } catch (error) {
      console.error('Error fetching all bikes:', error);
      return res.status(500).json({ message: 'Failed to fetch bikes' });
    }
  }

  @Get(':id')
  async getOneBike(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const bike = await this.bikesService.getOneBike(id);
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      return res.status(200).json(bike);
    } catch (error) {
      console.error(`Error fetching bike with id ${id}:`, error);
      return res.status(500).json({ message: 'Failed to fetch bike' });
    }
  }

  @Post()
  async addBike(@Body() bike: Bikes, @Res() res: Response): Promise<Response> {
    try {
      const newBike = await this.bikesService.addBike(bike);
      return res.status(201).json(newBike);
    } catch (error) {
      console.error('Error adding a bike:', error);
      return res.status(400).json({ message: 'Failed to add bike' });
    }
  }

  @Put(':id')
  async updateBike(@Param('id') id: number, @Body() bike: Bikes, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.bikesService.updateBike(id, bike);
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      return res.status(200).json({ message: 'Bike updated successfully' });
    } catch (error) {
      console.error(`Error updating bike with id ${id}:`, error);
      return res.status(400).json({ message: 'Failed to update bike' });
    }
  }

  @Delete(':id')
  async deleteBike(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.bikesService.deleteBike(id);
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Bike not found' });
      }
      return res.status(200).json({ message: 'Bike deleted successfully' });
    } catch (error) {
      console.error(`Error deleting bike with id ${id}:`, error);
      return res.status(500).json({ message: 'Failed to delete bike' });
    }
  }
}
