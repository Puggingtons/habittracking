import { IsNumber, IsOptional } from 'class-validator';

export class CreateHabitEntryDto {
  @IsOptional()
  @IsNumber()
  timestamp?: number;
}
