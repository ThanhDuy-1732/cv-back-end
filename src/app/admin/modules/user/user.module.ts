// Utilities
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { UserService } from './services/user.service';

// Entities
import { User } from 'src/app/admin/entities/user.entity';

@Module({
  controllers: [],
  exports: [UserService],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
