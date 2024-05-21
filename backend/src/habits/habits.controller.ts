import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHabits(@Request() req) {
    return this.habitsService.getHabitsOfUser(req.user.id);
  }
}
