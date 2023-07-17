import Player from 'xgplayer'
import './style/index.min.css'
import 'xgplayer/dist/index.min.js'
import Slower from './plugins/slower'
import Faster from './plugins/faster'
import PlayAfter from './plugins/playAfter'
import PlayBefore from './plugins/playBefore'
// import FlvPlugin from 'xgplayer-flv'
import WebMediaPlayer from './MediaPlayer'


// urlList=['http://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4', 
// 'https://www.openbeelden.nl/files/13/02/1303068.1302226.BG27239MPG_-HRE000033CB_2374760_2692600.mp4']

/**
 *
 * @param {*} id 
 * @param {*} url 
 * @param {*} width 
 * @param {*} height 
 * @param {*} urlList 
 * @returns {MediaPlayer}
 */
function initPlayer(id, width, height, urlList, enableFlv=false) {
    let pluginConfig 
    // if (enableFlv && FlvPlugin.isSupported()) {
    //     pluginConfig = [FlvPlugin, Slower, Faster, PlayAfter, PlayBefore]
    // } else {
    //     pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]
    // }
    pluginConfig = [Slower, Faster, PlayAfter, PlayBefore]

    return new WebMediaPlayer({
        id: id,
        url: urlList[0],
        width: width,
        height: height,
        videoInit: true,
        ignores: ['time', 'cssfullscreen', 'fullscreen', 'playbackrate'],
        "poster": "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/poster.jpg",
        closeVideoClick: true,
        controls: {
            mode: 'flex',
        },
        // urlList: urlList,
        // playId: 0,
        plugins: pluginConfig,
    }, urlList
)
    // return player
}



export { initPlayer }