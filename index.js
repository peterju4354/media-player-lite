import 'xgplayer/dist/index.min.js'
import 'xgplayer/dist/index.min.css'
import './style/index.min.css'
import Slower from './plugins/slower'
import Faster from './plugins/faster'
import PlayAfter from './plugins/playAfter'
import PlayBefore from './plugins/playBefore'
// import FlvPlugin from 'xgplayer-flv'
import MediaPlayer from './MediaPlayer'

function initPlayer(e, width, height, urlList, poster='') {
    const pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]
    // if (enableFlv && FlvPlugin.isSupported()) {
    //     pluginConfig = [FlvPlugin, Slower, Faster, PlayAfter, PlayBefore]
    // } else {
    //     pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]
    // }
    const selector = (!(e instanceof String)) ? { el: e } : { id: e }

    const player = new MediaPlayer({
        ...selector,
        url: urlList[0],
        width: width,
        height: height,
        videoInit: true,
        ignores: ['time', 'cssfullscreen', 'fullscreen', 'playbackrate', 'download', 'rotate', 'screenshot',
        'waitingtimeoutjump','stats','thumbnail','testspeed','dynamicbg','gapjump','miniprogress','playnext',
        'pip','xglogger','prompt','fpsdetect','miniscreen','keyboard'],
        "poster": poster,
        closeVideoClick: true,
        closeVideoDblclick: true,
        controls: { mode: 'flex' },
        plugins: pluginConfig,
    }, urlList
    )

    return player
}



export { initPlayer }