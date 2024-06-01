import {
  Controller,
  Request,
  Get,
  UseGuards,
  Body,
  Post,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateHabitDto } from './habit.create.dto';
import { CreateHabitEntryDto } from './habitEntry.create.dto';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHabits(@Request() req) {
    return this.habitsService.getHabitsOfUser(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  postHabit(@Body() createHabitDto: CreateHabitDto, @Request() req) {
    return this.habitsService.createHabitOfUser(createHabitDto, req.user.id);
  }

  @Post('/:id/entry')
  @UseGuards(AuthGuard)
  postHabitEntry(
    @Param() params: { id: string },
    @Body() createHabitEntryDto: CreateHabitEntryDto,
    @Request() req,
  ) {
    const id = Number.parseInt(params.id);

    if (Number.isNaN(id)) {
      throw new BadRequestException('id has to be a number!');
    }

    return this.habitsService.addHabitEntryOfUser(
      createHabitEntryDto,
      id,
      req.user.id,
    );
  }
}
