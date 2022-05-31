import { Module } from '@nestjs/common';
import { WordModule } from 'src/word/word.module';
import { SolverController } from './solver.controller';

@Module({
  imports: [WordModule],
  controllers: [SolverController]
})
export class SolverModule {}
