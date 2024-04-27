import {
  Controller,
  Request,
  Get,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateHabitDto } from './habit.create.dto';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getHabits(@Request() req) {
    // return this.habitsService.getHabitsOfUser(req.user.id);
    return this.habitsService.getDebugHabits();
  }

  @Post()
  @UseGuards(AuthGuard)
  postHabit(@Body() createHabitDto: CreateHabitDto, @Request() req) {
    return this.habitsService.createHabitOfUser(createHabitDto, req.user.id);
  }
}
