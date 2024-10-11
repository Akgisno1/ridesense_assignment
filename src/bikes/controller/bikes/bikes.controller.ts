import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common'; 
import { BikesService } from 'src/bikes/service/bikes/bikes.service'; 
import { Response } from 'express'; 
import { CreateBikeDto } from 'src/bikes/dtos/create-bike.dto'; 
import { UpdateBikeDto } from 'src/bikes/dtos/update-bike.dto'; 
import { ApiResponse, ApiTags } from '@nestjs/swagger'; 

@ApiTags('bikes') // Tag for grouping endpoints in Swagger UI
@Controller('bikes') // Defines the base route for the controller
export class BikesController {
  constructor(private bikesService: BikesService) {} // Injecting the BikesService to access service methods

  // Retrieves all bike records
  @Get()
  @ApiResponse({ status: 200, description: 'List of bikes retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch bikes.' })
  async getAllBikes(@Res() res: Response): Promise<Response> {
    try {
      const bikes = await this.bikesService.getAllBikes();
      return res.status(200).json(bikes); 
    } catch (error) {
      console.error('Error fetching all bikes:', error); 
      return res.status(500).json({ message: 'Failed to fetch bikes' }); 
    }
  }

  // Retrieves a bike by ID
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Bike retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch bike.' })
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

  // Adds a new bike record
  @Post()
  @ApiResponse({ status: 201, description: 'Bike created successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to add bike.' })
  async addBike(@Body() createBikeDto: CreateBikeDto, @Res() res: Response): Promise<Response> {
    try {
      const newBike = await this.bikesService.addBike(createBikeDto); 
      return res.status(201).json(newBike); 
    } catch (error) {
      console.error('Error adding a bike:', error); 
      return res.status(400).json({ message: 'Failed to add bike' }); 
    }
  }

  // Updates an existing bike by ID
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Bike updated successfully.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  @ApiResponse({ status: 400, description: 'Failed to update bike.' })
  async updateBike(
    @Param('id') id: number,
    @Body() updateBikeDto: UpdateBikeDto,
    @Res() res: Response
  ): Promise<Response> {
    try {
      const result = await this.bikesService.updateBike(id, updateBikeDto); 
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Bike not found' }); 
      }
      return res.status(200).json({ message: 'Bike updated successfully' });
    } catch (error) {
      console.error(`Error updating bike with id ${id}:`, error); 
      return res.status(400).json({ message: 'Failed to update bike' }); 
    }
  }

  // Deletes a bike by ID
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Bike deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  @ApiResponse({ status: 500, description: 'Failed to delete bike.' })
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
