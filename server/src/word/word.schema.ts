import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @Prop({
    unique: true,
    required: true,
  })
  value: string;
  @Prop({
    required: true,
  })
  length: Number;
}

export const WordSchema = SchemaFactory.createForClass(Word);
