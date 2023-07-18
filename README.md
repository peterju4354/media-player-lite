# media-player-lite
A video/audio player for your web page based on [xgplayer](https://github.com/bytedance/xgplayer).

## Install
```zsh
npm install media-player-lite
```
## Usage
```javascript
import { initPlayer } from 'media-player-lite'

const player = initPlayer(e, width, height, list, poster)
player.play()
```

### Parameters
- `e`: the selector (`Object, required`)
- `width`: width of the player (`Number, required`)
- `height`: height of the player (`Number, required`)
- `list`: the playlist (`Array, required`)
- `poster`: the poster url of the video player (`String, default=''`)

## Plugins
### What is here?
A lot of default plugins are removed. The ones that we kept are:
- `controls`
- `definition`
- `enter`
- `error`
- `loading`
- `pc`
- `play`
- `poster`
- `progress`
- `replay`
- `start`
- `volume`
- `progresspreview`

Besides the ones that we inherited from [xgplayer](https://github.com/bytedance/xgplayer), these are the ones that are completely new:
- `faster`: To play the video at 2x speed or to reset the speed to 1x when you click on it again.
- `slower`: To play the video at 0.5x speed or to reset the speed to 1x when you click on it again.
- `play after`: This seems to be very similar to what [xgplayer](https://github.com/bytedance/xgplayer) have: `playNext`. However, we are using a very different way to implement this. The playlist is no longer a configuration but an element of `MediaPlayer`. The first element in the playlist is the one that gets to play first. There is also an indexer to record which video/url is playing right now, and what is before/after it. When you reach to the last video in the list, it refreshes the current video.
- `play before`: To play the video before on the playlist. When you are playing the first video in the list, it refreshes the current video.
### What if I want more?
As always, like what [xgplayer](https://github.com/bytedance/xgplayer) believes, you can always customize your own plugin or modify what we have right now.

## License
[MIT](./LICENSE) license

