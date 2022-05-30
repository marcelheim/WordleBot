import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { WordDTO } from './word.dto';
import { WordService } from './word.service';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  async get() {
    return this.wordService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    let word = await this.wordService.findOne(id);
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }

  @Post()
  async post(@Body() body: WordDTO) {
    return this.wordService.createOne(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    let word = await this.wordService.deleteOne(id);
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }
}
