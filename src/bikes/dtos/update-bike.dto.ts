
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateBikeDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  make?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  year?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;
}

