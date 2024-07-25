// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { InformationService } from './service/information.service';

// Controllers
import { InformationController } from './controller/information.controller';

// Entities
import { Information } from '../../entities/information.entity';

@Module({
  exports: [InformationService],
  providers: [InformationService],
  controllers: [InformationController],
  imports: [TypeOrmModule.forFeature([Information])],
})
export class InformationModule {}
