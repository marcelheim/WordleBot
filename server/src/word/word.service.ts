import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WordDTO } from './word.dto';
import { Word, WordDocument } from './word.schema';

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordModel: Model<WordDocument>) {}

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
