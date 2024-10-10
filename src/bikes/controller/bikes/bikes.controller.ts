import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common'; // Importing necessary decorators and modules

import { BikesService } from 'src/bikes/service/bikes/bikes.service'; // Importing the BikesService to handle business logic

import { Response } from 'express'; // Importing Response object from Express for sending responses
import { CreateBikeDto } from 'src/bikes/dtos/create-bike.dto'; // DTO for creating a new bike
import { UpdateBikeDto } from 'src/bikes/dtos/update-bike.dto'; // DTO for updating a bike

@Controller('bikes') // Defines the base route for the controller
export class BikesController {
  constructor(private bikesService: BikesService) {} // Injecting the BikesService to access service methods

  // Retrieves all bike records
  @Get()
  async getAllBikes(@Res() res: Response): Promise<Response> {
    try {
      const bikes = await this.bikesService.getAllBikes(); // Calls the service to fetch all bikes
      return res.status(200).json(bikes); // Responds with the bikes and status 200
    } catch (error) {
      console.error('Error fetching all bikes:', error); // Logs errors if encountered
      return res.status(500).json({ message: 'Failed to fetch bikes' }); // Sends error response with status 500
    }
  }

  // Retrieves a bike by ID
  @Get(':id')
  async getOneBike(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const bike = await this.bikesService.getOneBike(id); // Calls the service to fetch a bike by ID
      if (!bike) {
        return res.status(404).json({ message: 'Bike not found' }); // If bike not found, responds with 404
      }
      return res.status(200).json(bike); // Responds with the bike data and status 200
    } catch (error) {
      console.error(`Error fetching bike with id ${id}:`, error); // Logs any errors encountered
      return res.status(500).json({ message: 'Failed to fetch bike' }); // Sends error response with status 500
    }
  }

  // Adds a new bike record
  @Post()
  async addBike(@Body() createBikeDto: CreateBikeDto, @Res() res: Response): Promise<Response> {
    try {
      const newBike = await this.bikesService.addBike(createBikeDto); // Calls the service to add a new bike
      return res.status(201).json(newBike); // Responds with the new bike and status 201
    } catch (error) {
      console.error('Error adding a bike:', error); // Logs errors if encountered
      return res.status(400).json({ message: 'Failed to add bike' }); // Sends error response with status 400
    }
  }

  // Updates an existing bike by ID
  @Put(':id')
  async updateBike(
    @Param('id') id: number,
    @Body() updateBikeDto: UpdateBikeDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.bikesService.updateBike(id, updateBikeDto); // Calls the service to update a bike
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Bike not found' }); // If no bike is updated, responds with 404
      }
      return res.status(200).json({ message: 'Bike updated successfully' }); // Responds with success message and status 200
    } catch (error) {
      console.error(`Error updating bike with id ${id}:`, error); // Logs errors if encountered
      return res.status(400).json({ message: 'Failed to update bike' }); // Sends error response with status 400
    }
  }

  // Deletes a bike by ID
  @Delete(':id')
  async deleteBike(@Param('id') id: number, @Res() res: Response): Promise<Response> {
    try {
      const result = await this.bikesService.deleteBike(id); // Calls the service to delete a bike
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Bike not found' }); // If no bike is deleted, responds with 404
      }
      return res.status(200).json({ message: 'Bike deleted successfully' }); // Responds with success message and status 200
    } catch (error) {
      console.error(`Error deleting bike with id ${id}:`, error); // Logs errors if encountered
      return res.status(500).json({ message: 'Failed to delete bike' }); // Sends error response with status 500
    }
  }
}
