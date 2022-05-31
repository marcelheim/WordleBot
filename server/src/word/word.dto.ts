import { ApiProperty } from "@nestjs/swagger";

export class WordDTO {
  @ApiProperty()
  value: string;
  @ApiProperty()
  length: number;
}
