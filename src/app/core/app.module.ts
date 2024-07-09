import { Module } from '@nestjs/common';
import { HeroModule } from './modules/hero/hero.module';

@Module({
  imports: [HeroModule],
})
export class AppCoreModule {}
