/// <reference types="svelte" />

type Tile = {
    letter: string,
    evaluation: Evaluation
}

type BoardMatrix = {
    width: number,
    height: number,
    tiles: [Tile?]
}

type Config = {
    url: string
}