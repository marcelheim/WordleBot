import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './word.schema';
import { WordService } from './word.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Word.name,
        schema: WordSchema,
      },
    ]),
  ],
  providers: [WordService],
  exports: [WordService],
})
export class WordModule {}
