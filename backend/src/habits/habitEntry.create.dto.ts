import { IsNumber } from 'class-validator';

export class CreateHabitEntryDto {
  @IsNumber()
  timestamp?: number;
}
