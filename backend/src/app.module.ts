import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { HabitsModule } from './habits/habits.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, HabitsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
