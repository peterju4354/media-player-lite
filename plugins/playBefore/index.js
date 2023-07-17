import { Plugin } from "xgplayer";
import { Events } from "xgplayer";
const { POSITIONS } = Plugin

export default class PlayBefore extends Plugin {
    static get pluginName() {
        return 'Play Before'
    }

    static get defaultConfig() {
        return{ 
            position: POSITIONS.CONTROLS_LEFT,
            index: 2,
        }
    }   

    constructor(args) {
        super(args)
    }

    afterCreate() {
        this.icon = this.find('.icon')

        this.onClick = () => {
          if (0 > this.player.playerId - 1) {
            this.changeSrc(this.player.currentSrc)
          } else {
            this.player.playerId--
            this.changeSrc(this.player.urlList[this.player.playerId])
          }
        }
        this.bind('click', this.onClick)
    }

    changeSrc (url) {
      const { player } = this
      if (!url) {
        return
      }
      player.pause()
      player.currentTime = 0
      if (player.switchURL) {
        player.switchURL(url)
      } else {
        player.src = url
      }
      player.config.url = url
      player.play()
    }

    destroy() {
        this.unbind('click', this.onClick)
        this.icon = null
    }

    show() {
        super.show()
    }

    render() {
        return `<xg-icon><div class="xgplayer-icon">
        <svg style="transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="10 0 24 40">\n  <path transform="scale(0.038 0.028)" d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>\n</svg></div>
        <div class='xg-tips'>${this.pluginName}</div></xg-icon>`
    }
}