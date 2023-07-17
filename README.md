# media-player-lite
A video player for your web page based on [xgplayer](https://github.com/bytedance/xgplayer).

## Install
```zsh
npm install media-player-lite
```
## Usage
```javascript
import { initPlayer } from 'media-player-lite'

const player = initPlayer(id, width, height, list, poster)
player.play()
```

## Parameters
```
id: the id of the HTML element {String}
width: width of the player {Number}
height: height of the player {Number}
list: the playlist {Array}
poster: the poster url of the video player {String}
```

## License
[MIT](./LICENSE) license

