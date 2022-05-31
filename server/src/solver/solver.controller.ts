import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WordService } from 'src/word/word.service';
import { BoardDTO } from './board.dto';

@ApiTags('solver')
@Controller('solver')
export class SolverController {
    constructor(private readonly wordService: WordService){}

    @Post()
    async findWords(@Body() board: BoardDTO){
        return this.wordService.findSome(board)
    }
}
