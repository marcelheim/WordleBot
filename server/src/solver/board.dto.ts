import { ApiProperty } from "@nestjs/swagger"
import { TileDTO } from "./tile.dto"

export class BoardDTO {
    @ApiProperty()
    width: number
    @ApiProperty()
    height: number
    @ApiProperty({
        type: [TileDTO]
    })
    tiles: TileDTO[]
}