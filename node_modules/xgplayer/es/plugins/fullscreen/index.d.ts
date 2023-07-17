/**
 * @typedef { {
 *   position?: string,
 *   index?: number,
 *   useCssFullscreen?: boolean,
 *   rotateFullscreen?: boolean,
 *   switchCallback?: () => any,
 *   target?: null | HTMLElement,
 *   disable?: boolean,
 *   needBackIcon?: boolean,
 *   [propName: string]: any
 * } } IFullscreenConfig
 */
export default class Fullscreen extends IconPlugin {
    /**
     * @type IFullscreenConfig
     */
    static get defaultConfig(): IFullscreenConfig;
    handleFullscreen: any;
    topBackIcon: any;
    /**
     * @private
     */
    private _onOrientationChange;
    /**
     * @private
     */
    private registerIcons;
    initIcons(): void;
    /**
     * 切换全屏
     * @param { Event } [e]
     */
    toggleFullScreen(e?: Event): void;
    /**
     *
     * @param { boolean } isFullScreen
     */
    animate(isFullScreen: boolean): void;
    show(): void;
    /**
     * @private
     * @returns
     */
    private render;
}
export type IFullscreenConfig = {
    [propName: string]: any;
    position?: string;
    index?: number;
    useCssFullscreen?: boolean;
    rotateFullscreen?: boolean;
    switchCallback?: () => any;
    target?: null | HTMLElement;
    disable?: boolean;
    needBackIcon?: boolean;
};
import IconPlugin from "../common/iconPlugin";
