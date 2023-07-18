import { Plugin } from "xgplayer";

const { POSITIONS } = Plugin

export default class Faster extends Plugin {
    static get pluginName() { return 'faster' }

    static get defaultConfig() {
        return{ 
            position: POSITIONS.CONTROLS_LEFT,
            index: 3,
        }
    }   

    constructor(args) { super(args) }

    afterCreate() {
        this.icon = this.find('.icon')
        this.onClick = () => {
            if (this.player.playbackRate == 1) this.player.playbackRate = 2
            else this.player.playbackRate = 1
        }
        this.bind('click', this.onClick)
    }

    destroy() {
        this.unbind('click', this.onClick)
        this.icon = null
    }

    show() { super.show() }

    render() { return `<xg-icon><div class="xgplayer-icon">
        <svg width="28" height="40" viewBox="2 -5 9 20" fill="none" xmlns="http://www.w3.org/2000/svg"\n  xmlns:xlink="http://www.w3.org/1999/xlink">\n  <path opacity="0.54"\n    d="M7.5 3.63397C8.16667 4.01887 8.16667 4.98113 7.5 5.36603L1.5 8.83013C0.833334 9.21503 0 8.7339 0 7.9641L0 1.0359C0 0.266098 0.833333 -0.215027 1.5 0.169873L7.5 3.63397Z"\n    fill="white" />\n  <path transform="translate(5 0)" d="M7.5 3.63397C8.16667 4.01887 8.16667 4.98113 7.5 5.36603L1.5 8.83013C0.833334 9.21503 0 8.7339 0 7.9641L0 1.0359C0 0.266098 0.833333 -0.215027 1.5 0.169873L7.5 3.63397Z" fill="white"/>\n</svg></div>
        <div class='xg-tips'>${this.pluginName}</div></xg-icon>` }
}