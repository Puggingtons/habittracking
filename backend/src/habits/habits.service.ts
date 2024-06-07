import { CreateHabitDto } from './habit.create.dto';
import { CreateHabitEntryDto } from './habitEntry.create.dto';
import { Habit } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateHabitDto } from './habit.update.dto';

@Injectable()
export class HabitsService {
  constructor(private prismaService: PrismaService) {}

  async getDebugHabits(userId = 1) {
    // TODO remove test data and use prisma instead
    return [
      { id: 0, name: 'TestHabit', interval: 1, description: 'dings', userId },
      {
        id: 1,
        name: 'TestWeeklyHabit',
        interval: 7,
        description: 'bums',
        userId,
      },
      {
        id: 2,
        name: 'TestHabitDings',
        interval: 69,
        description: 'foo',
        userId,
      },
    ];
  }

  async getHabitsOfUser(userId: number): Promise<Habit[]> {
    return this.getDebugHabits(userId);
    // return this.prismaService.habit.findMany({ where: { userId: userId } });
  }

  async createHabitOfUser(habitDto: CreateHabitDto, userId: number) {
    this.prismaService.habit.create({
      data: {
        ...habitDto,
        User: { connect: { id: userId } },
      },
    });
  }

  async deleteHabitOfUser(habitId: number, userId: number) {
    await this.ensureUserHasHabit(userId, habitId);

    this.prismaService.habit.delete({ where: { id: habitId } });
  }

  async addHabitEntryOfUser(
    createHabitEntryDto: CreateHabitEntryDto,
    habitId: number,
    userId: number,
  ) {
    await this.ensureUserHasHabit(userId, habitId);

    // use the specified date if it exists
    // if not, use current Date
    const timestamp = createHabitEntryDto.timestamp
      ? new Date(createHabitEntryDto.timestamp)
      : new Date();

    return this.prismaService.habitEntry.create({
      data: { timestamp: timestamp, Habit: { connect: { id: habitId } } },
    });
  }

  async updateHabitOfUser(
    updateHabitDto: UpdateHabitDto,
    habitId: number,
    userId: number,
  ) {
    await this.ensureUserHasHabit(userId, habitId);

    return this.prismaService.habit.update({
      where: { id: habitId },
      data: updateHabitDto,
    });
  }

  private async ensureUserHasHabit(userId: number, habitId: number) {
    const userHasHabit = await this.checkUserHasHabit(userId, habitId);
    if (!userHasHabit) {
      throw new Error(
        `Habit with id: ${habitId} does not belong to user with id: ${userId}!`,
      );
    }
  }

  private async checkUserHasHabit(
    userId: number,
    habitId: number,
  ): Promise<boolean> {
    return (
      (await this.prismaService.habit.findFirst({
        where: { id: habitId, userId: userId },
      })) !== undefined
    );
  }
}
