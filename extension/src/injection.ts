import browser from "webextension-polyfill";

let board: BoardMatrix = {
    Height: undefined,
    Width: undefined,
    Tiles: []
}

let config: Config = {
    Url: undefined
}

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

const readConfig = async () => config = (await browser.storage.local.get('config')).config
const writeConfig = (config: Config) => browser.storage.local.set(config)

const refreshBoard = () => {
    let rows = document.querySelector('game-app').shadowRoot.querySelector('#board').querySelectorAll('game-row')
    let tiles: [Tile?] = []
    rows.forEach(r => r.shadowRoot.querySelectorAll('game-tile').forEach(t => {
        if(!t.attributes['evaluation']) return
        tiles.push({
            Letter: t.attributes['letter'].value,
            Evaluation: getEvaluationAsEnum(t.attributes['evaluation'].value)
        })
    }))
    
    board.Height = rows.length
    board.Width =  Number(rows[0].attributes[1].value)
    board.Tiles = tiles
}

const typeWord = (word) => {
    clearWord()
    for (let i = 0; i < word.length; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key': word.charAt(i)}))
    }
}
const submitWord = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}))
}
const clearWord = () => {
    for (let i = 0; i < board.Width; i++) {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}))
    }
}

const getWordList = async () => {
    /*let url = config.Url + '?' + new URLSearchParams({
        Width: board.Width.toString(),
        Height: board.Height.toString()
    })
    board.Tiles.forEach(t => {
        url += '&' + new URLSearchParams({
            Tiles: JSON.stringify(t)
        })
    })
    console.log(url)*/
    fetch(config.Url, {
        method: 'post',
        body: JSON.stringify(board, (key, value) => value)
    })
}

browser.runtime.onMessage.addListener(async (message) => {
    if (message.command === 'typeWord') typeWord(message['word'])
    else if(message.command === 'submitWord') submitWord()
    else if(message.command === 'clearWord') clearWord()
    else if(message.command === 'refreshConfig') await readConfig()
    else if(message.command === 'fetchWords') await getWordList()
    console.log(config)
});

window.addEventListener('load', async () => {
    console.log('injected')
    await readConfig()
    refreshBoard()
})

/*
window.addEventListener('keydown', e => {
    refreshBoard()
})*/
