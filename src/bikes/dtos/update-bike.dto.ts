
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateBikeDto {
  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  @Min(1900)
  @Max(new Date().getFullYear())
  year?: number;

  @IsString()
  @IsOptional()
  type?: string;
}

