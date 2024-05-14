import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [HabitsController],
  providers: [HabitsService],
  imports: [PrismaModule],
})
export class HabitsModule {}
