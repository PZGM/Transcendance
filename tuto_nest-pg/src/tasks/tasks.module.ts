import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { Task } from './entities/task.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
