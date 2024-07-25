// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { AwardService } from './service/award.service';

// Controller
import { AwardController } from './controller/award.controller';

// Entities
import { Award } from '../../entities/award.entity';

@Module({
  exports: [AwardService],
  providers: [AwardService],
  controllers: [AwardController],
  imports: [TypeOrmModule.forFeature([Award])],
})
export class AwardModule {}
