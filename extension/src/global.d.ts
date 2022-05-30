/// <reference types="svelte" />

enum Evaluation {
    Absent,
    Present,
    Correct
}

type Tile = {
    Letter: string,
    Evaluation: Evaluation
}

type BoardMatrix = {
    Width: number,
    Height: number,
    Tiles: [Tile?]
}

type Config = {
    Url: string
}