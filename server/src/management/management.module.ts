import { Module } from '@nestjs/common';
import { WordModule } from 'src/word/word.module';
import { ManagementController } from './management.controller';

@Module({
  imports: [WordModule],
  controllers: [ManagementController],
})
export class ManagementModule {}
