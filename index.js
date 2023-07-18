import './style/index.min.css'
import 'xgplayer/dist/index.min.js'
import Slower from './plugins/slower'
import Faster from './plugins/faster'
import PlayAfter from './plugins/playAfter'
import PlayBefore from './plugins/playBefore'
// import FlvPlugin from 'xgplayer-flv'
import MediaPlayer from './MediaPlayer'

function initPlayer(id, width, height, urlList, poster='') {
    let pluginConfig 
    // if (enableFlv && FlvPlugin.isSupported()) {
    //     pluginConfig = [FlvPlugin, Slower, Faster, PlayAfter, PlayBefore]
    // } else {
    //     pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]
    // }
    pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]

    const player = new MediaPlayer({
        id: id,
        url: urlList[0],
        width: width,
        height: height,
        videoInit: true,
        ignores: ['time', 'cssfullscreen', 'fullscreen', 'playbackrate', 'download', 'rotate', 'screenshot',
        'waitingtimeoutjump','stats','thumbnail','testspeed','dynamicbg','gapjump','miniprogress','playnext',
        'pip','progresspreview','xglogger','prompt','fpsdetect','miniscreen','keyboard'],
        "poster": poster,
        closeVideoClick: true,
        controls: {
            mode: 'flex',
        },
        plugins: pluginConfig,
    }, urlList
    )

    return player
}



export { initPlayer }