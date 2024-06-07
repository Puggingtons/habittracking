import {
  Controller,
  Request,
  Get,
  UseGuards,
  Body,
  Post,
  Param,
  BadRequestException,
  Delete,
  Put,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateHabitDto } from './habit.create.dto';
import { CreateHabitEntryDto } from './habitEntry.create.dto';
import { UpdateHabitDto } from './habit.update.dto';

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

  @Put('/:id')
  @UseGuards(AuthGuard)
  putHabit(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req,
  ) {
    const parsedId = this.parseId(id);
    return this.habitsService.updateHabitOfUser(
      updateHabitDto,
      parsedId,
      req.user.id,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteHabit(@Param('id') id: string, @Request() req) {
    const parsedId = this.parseId(id);

    return this.habitsService.deleteHabitOfUser(parsedId, req.user.id);
  }

  @Post('/:id/entry')
  @UseGuards(AuthGuard)
  postHabitEntry(
    @Param('id') id: string,
    @Body() createHabitEntryDto: CreateHabitEntryDto,
    @Request() req,
  ) {
    const parsedId = this.parseId(id);

    return this.habitsService.addHabitEntryOfUser(
      createHabitEntryDto,
      parsedId,
      req.user.id,
    );
  }

  private parseId(id: string): number {
    const parsedId = Number.parseInt(id);

    if (Number.isNaN(parsedId)) {
      throw new BadRequestException('id has to be a number!');
    }
    return parsedId;
  }
}
