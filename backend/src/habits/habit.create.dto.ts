import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  interval: number;
}
