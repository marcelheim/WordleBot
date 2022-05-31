import browser from "webextension-polyfill";

let board: BoardMatrix = {
    height: undefined,
    width: undefined,
    tiles: []
}

let config: Config = {
    url: undefined
}

let guesses = []

let guessCounter = 0

const getEvaluationAsEnum = (evaluation: string) => {
    switch (evaluation) {
        case 'absent':
            return 0
        case 'correct':
            return 2
        case 'present':
            return 1
        default:
            return 0
    }
}

const readConfig = async () => {
    config = (await browser.storage.local.get('config')).config
    getWordList()
}
const writeConfig = (config: Config) => browser.storage.local.set(config)

const refreshBoard = async () => {
    let rows = document.querySelector('game-app').shadowRoot.querySelector('#board').querySelectorAll('game-row')
    let tiles: [Tile?] = []
    rows.forEach(r => r.shadowRoot.querySelectorAll('game-tile').forEach(t => {
        if(!t.attributes['evaluation']) return
        tiles.push({
            letter: t.attributes['letter'].value,
            evaluation: getEvaluationAsEnum(t.attributes['evaluation'].value)
        })
    }))
    
    board.height = rows.length
    board.width =  Number(rows[0].attributes.getNamedItem('length').nodeValue)
    board.tiles = tiles
}

const typeWord = async (word) => {
    await clearWord()
    for (let i = 0; i < word.length; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key': word.charAt(i)}))
    }
}
const submitWord = async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}))
}
const clearWord = async () => {
    for (let i = 0; i < board.width; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}))
    }
}

const getWordList = async () => {
    await refreshBoard()
    console.log(board)
    let res = await fetch(config.url, {
        method: 'post',
        body: JSON.stringify(board, (key, value) => value),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    let words = await res.json()

    guesses = words
}

const guessWord = async () => {
    await typeWord(guesses[guessCounter % guesses.length].value)
    let rand = guessCounter
    while(rand == guessCounter){
        rand = Math.floor(Math.random() * guesses.length)
    }
    guessCounter = rand
}

browser.runtime.onMessage.addListener(async (message) => {
    if (message.command === 'typeWord') typeWord(message['word'])
    else if(message.command === 'submitWord') submitWord()
    else if(message.command === 'clearWord') clearWord()
    else if(message.command === 'refreshConfig') readConfig()
    else if(message.command === 'fetchWords') getWordList()
    else if(message.command === 'guessWord') guessWord()
});

window.addEventListener('load', async () => {
    console.log('injected')
    await readConfig()
})

window.addEventListener('keydown',async (e) => {
    if (e.key == 'Enter') getWordList()
    else if(e.key == '.') guessWord()
})