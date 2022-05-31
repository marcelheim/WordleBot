import { ApiProperty } from "@nestjs/swagger"

export class TileDTO {
    @ApiProperty({
        default: "a"
    })
    letter: string
    @ApiProperty()
    evaluation: number
}