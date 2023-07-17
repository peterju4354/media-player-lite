import Player from 'xgplayer'

class MediaPlayer extends Player {
    constructor(options, list) {
        super(options)
        this.urlList = list
        this.playerId = 0
    }

    get urlList() {
        return this._urlList
    }

    get playerId() {
        return this._playerId
    }

    set urlList(value) {
        this._urlList = value
    }

    set playerId(value) {
        this._playerId = value
    }
}

export default MediaPlayer