import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export class CreateBikeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsNumber()
  @Min(1900)  
  @Max(new Date().getFullYear())  
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;
}
