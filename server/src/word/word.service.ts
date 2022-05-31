import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardDTO } from 'src/solver/board.dto';
import { WordDTO } from './word.dto';
import { Word, WordDocument } from './word.schema';

class FilterDTO {
  correct: string
  maybe: string[]
  not: string[]
}

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordModel: Model<WordDocument>) {}

  async findSome(board: BoardDTO): Promise<Word[]> {
    let pipeline = []

    let filter: FilterDTO[] = []

    for (let i = 0; i < board.width; i++) {
      filter[i] = {
        correct: undefined,
        maybe: [],
        not: []
      }
    }

    let presentLetterToSkipForLine = undefined

    for(let i = 0; i < board.tiles.length; i++){
      //Absent
      if(board.tiles[i].evaluation == 0){
        for (let j = 0; j < board.width; j++) {
          if(filter[j].correct != board.tiles[i].letter && presentLetterToSkipForLine != board.tiles[i].letter) filter[j].not.push(board.tiles[i].letter)
        }
      }
      //Present
      else if(board.tiles[i].evaluation == 1){
        for (let j = 0; j < board.width; j++) {
          filter[j].maybe.push(board.tiles[i].letter)
        }
        filter[i % board.width].not.push(board.tiles[i].letter)
        presentLetterToSkipForLine = board.tiles[i].letter
      }
      //Correct
      else if(board.tiles[i].evaluation == 2){
        filter[i % board.width].not = filter[i % board.width].not.filter(el => el != board.tiles[i].letter)
        filter[i % board.width].correct = board.tiles[i].letter
      }
      if(i % board.width == board.width - 1) presentLetterToSkipForLine = undefined
    }

    pipeline.push({
      $match: {
        length: board.width
      }
    })

    let correctStage = "^"
    let notStage = "^"
    let maybeStages = []

    filter.forEach(el => {
      el.maybe = [...new Set(el.maybe)]
      el.not = [...new Set(el.not)]

      correctStage += el.correct ? el.correct : '.'

      if(el.not.length > 0){
        notStage += "[^"
        el.not.forEach(not => {
          notStage += not
        })
        notStage += "]"
      }
      else notStage += "."
      
      
      el.maybe.forEach(maybe => {
        maybeStages.push(maybe)
      })
    });

    maybeStages = [...new Set(maybeStages)]

    correctStage += "$"
    notStage += "$"

    pipeline.push({
      $match: {
        value: {
          $regex: correctStage
        }
      }
    })

    pipeline.push({
      $match: {
        value: {
          $regex: notStage
        }
      }
    })

    maybeStages.forEach(maybe => {
      pipeline.push({
        $match: {
          value: {
            $regex: maybe
          }
        }
      })
    })

    console.log(correctStage, notStage, maybeStages)

    let words = await this.wordModel.aggregate(pipeline)
    
    return words
  }


  async findAll(): Promise<Word[]> {
    return await this.wordModel.find()
  }

  async findOne(id: string): Promise<Word | undefined> {
    return await this.wordModel.findById(id)
  }

  async createOne(word: WordDTO): Promise<Word | undefined> {
    return await this.wordModel.create(word)
  }

  async updateOne(id: string, word: WordDTO) {
    let w =  await this.wordModel.findByIdAndUpdate(id, word)
    if(w) w = await this.wordModel.findById(id)
    return w
  }

  async deleteOne(id: string) {
    return await this.wordModel.findByIdAndDelete(id)
  }
}
