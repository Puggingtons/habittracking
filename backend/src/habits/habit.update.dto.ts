import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  interval?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
