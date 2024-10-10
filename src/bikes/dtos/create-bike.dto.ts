import { IsString, IsNumber, IsNotEmpty, IsOptional, Min, Max } from 'class-validator';

export class CreateBikeDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(1900)  
  @Max(new Date().getFullYear())  
  year: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
