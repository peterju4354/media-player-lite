export default Keyboard;
export type IKeyboardConfig = {
    [propName: string]: any;
    seekStep?: number;
    checkVisible?: boolean;
    disableBodyTrigger?: boolean;
    keyCodeMap?: {
        [propName: string]: any;
    };
    disable: boolean;
    isIgnoreUserActive: boolean;
};
declare class Keyboard extends BasePlugin {
    /**
     * @type IKeyboardConfig
     */
    static get defaultConfig(): IKeyboardConfig;
    mergekeyCodeMap(): void;
    seekStep: number;
    keyCodeMap: {
        space: {
            keyCode: number;
            action: string;
            disable: boolean;
            noBodyTarget: boolean;
        };
        up: {
            keyCode: number;
            action: string;
            disable: boolean;
            noBodyTarget: boolean;
        };
        down: {
            keyCode: number;
            action: string;
            disable: boolean;
            noBodyTarget: boolean;
        };
        left: {
            keyCode: number;
            action: string;
            disable: boolean;
        };
        right: {
            keyCode: number;
            action: string;
            disable: boolean;
        };
        esc: {
            keyCode: number;
            action: string;
            disable: boolean;
        };
    };
    checkIsVisible(): boolean;
    checkCode(code: any, isBodyTarget: any): boolean;
    downVolume(event: any): void;
    upVolume(event: any): void;
    seek(event: any): void;
    seekBack(event: any): void;
    playPause(event: any): void;
    exitFullscreen(event: any): void;
    onBodyKeyDown: (event: any) => boolean;
    onKeydown: (event: any) => boolean;
    handleKeyCode(curKeyCode: any, event: any): void;
    disable(): void;
    enable(): void;
}
import { BasePlugin } from "../../plugin";
