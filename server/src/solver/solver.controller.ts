import { Body, Controller, Post } from '@nestjs/common';
import { WordService } from 'src/word/word.service';
import { BoardDTO } from './board.dto';

@Controller('solver')
export class SolverController {
    constructor(private readonly wordService: WordService){}

    @Post()
    async findWords(@Body() board: BoardDTO){
        return this.wordService.findSome(board)
    }
}
