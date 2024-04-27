import { Habit } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prismaService: PrismaService) {}

  async getHabitsOfUser(userId: number): Promise<Habit[]> {
    // TODO remove test data and use prisma instead
    return [
      { id: 0, name: 'TestHabit', interval: 1, userId },
      { id: 1, name: 'TestWeeklyHabit', interval: 7, userId },
      { id: 2, name: 'TestHabitDings', interval: 69, userId },
    ];

    // return this.prismaService.habit.findMany({ where: { userId: userId } });
  }
}
