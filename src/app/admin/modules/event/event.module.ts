// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { EventService } from './services/event.service';

//Entities
import { Event } from 'src/app/admin/entities/event.entity';

@Module({
  controllers: [],

  providers: [EventService],

  imports: [TypeOrmModule.forFeature([Event])],

  exports: [EventService, TypeOrmModule.forFeature([Event])],
})
export class EventModule {}
