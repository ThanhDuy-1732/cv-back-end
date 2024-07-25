// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { OverviewService } from './services/overview.service';

// Controller
import { OverviewController } from './controller/overview.controller';

// Entities
import { Overview } from '../../entities/overview.entity';

@Module({
  exports: [OverviewService],
  providers: [OverviewService],
  controllers: [OverviewController],
  imports: [TypeOrmModule.forFeature([Overview])],
})
export class OverviewModule {}
