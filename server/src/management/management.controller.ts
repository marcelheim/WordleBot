import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { WordDTO } from 'src/word/word.dto';
import { WordService } from 'src/word/word.service';

@UseGuards(JwtAuthGuard)
@Controller('management')
export class ManagementController {
  constructor(private readonly wordService: WordService) {}

  @Get('word')
  async getWord() {
    return this.wordService.findAll();
  }

  @Get('word/:id')
  async getOneWord(@Param('id') id: string) {
    let word = await this.wordService.findOne(id);
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }

  @Post('word')
  async postWord(@Body() body: WordDTO) {
    return this.wordService.createOne(body);
  }

  @Put('word/:id')
  async putWord(@Param('id') id: string, @Body() body: WordDTO) {
    let word = await this.wordService.updateOne(id, body)
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }

  @Delete('word/:id')
  async deleteWord(@Param('id') id: string) {
    let word = await this.wordService.deleteOne(id);
    if (!word) throw new NotFoundException('Word not found');
    return word;
  }
}
