import { CreateHabitDto } from './habit.create.dto';
import { Habit } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HabitsService {
  constructor(private prismaService: PrismaService) {}

  async getDebugHabits(userId = 1) {
    // TODO remove test data and use prisma instead
    return [
      { id: 0, name: 'TestHabit', interval: 1, userId },
      { id: 1, name: 'TestWeeklyHabit', interval: 7, userId },
      { id: 2, name: 'TestHabitDings', interval: 69, userId },
    ];
  }

  async getHabitsOfUser(userId: number): Promise<Habit[]> {
    return this.getDebugHabits(userId);
    // return this.prismaService.habit.findMany({ where: { userId: userId } });
  }

  async createHabitOfUser(habitDto: CreateHabitDto, userId: number) {
    this.prismaService.habit.create({
      data: {
        interval: habitDto.interval,
        name: habitDto.name,
        User: { connect: { id: userId } },
      },
    });
  }
}
