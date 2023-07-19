import 'xgplayer/dist/index.min.js'
import 'xgplayer/dist/index.min.css'
import './style/index.min.css'
import Slower from './plugins/slower'
import Faster from './plugins/faster'
import PlayAfter from './plugins/playAfter'
import PlayBefore from './plugins/playBefore'
import MediaPlayer from './MediaPlayer'

export function initPlayer(e, urlList, width, height, poster='') {
    const selector = (!(e instanceof String)) ? { el: e } : { id: e }
    return new MediaPlayer({
        ...selector,
        url: urlList[0],
        width: width,
        height: height,
        "poster": poster,

        videoInit: true,
        ignores: ['time', 'cssfullscreen', 'fullscreen', 'playbackrate', 'download', 'rotate', 'screenshot',
        'waitingtimeoutjump','stats','thumbnail','testspeed','dynamicbg','gapjump','miniprogress','playnext',
        'pip','xglogger','prompt','fpsdetect','miniscreen','keyboard'],
        closeVideoClick: true,
        closeVideoDblclick: true,
        controls: { mode: 'flex' },
        plugins: [Slower, Faster, PlayAfter, PlayBefore],
    }, urlList)
}

export function initPlayerConfig(e, urlList, config={}) {
    const selector = (!(e instanceof String)) ? { el: e } : { id: e }
    return new MediaPlayer({
        videoInit: true,
        ignores: ['time', 'cssfullscreen', 'fullscreen', 'playbackrate', 'download', 'rotate', 'screenshot',
        'waitingtimeoutjump','stats','thumbnail','testspeed','dynamicbg','gapjump','miniprogress','playnext',
        'pip','xglogger','prompt','fpsdetect','miniscreen','keyboard'],
        closeVideoClick: true,
        closeVideoDblclick: true,
        controls: { mode: 'flex' },
        plugins: [Slower, Faster, PlayAfter, PlayBefore],

        ...selector,
        ...config,
        url: urlList[0]
    }, urlList)
}