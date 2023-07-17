export default PIP;
declare class PIP extends IconPlugin {
    static get defaultConfig(): {
        position: string;
        index: number;
        showIcon: boolean;
    };
    static checkWebkitSetPresentationMode(video: any): boolean;
    beforeCreate(args: any): void;
    pMode: any;
    registerIcons(): {
        pipIcon: {
            icon: any;
            class: string;
        };
        pipIconExit: {
            icon: any;
            class: string;
        };
    };
    initIcons(): void;
    initPipEvents(): void;
    leavePIPCallback: () => void;
    enterPIPCallback: (e: any) => void;
    pipWindow: any;
    onWebkitpresentationmodechanged: (e: any) => void;
    switchPIP: (e: any) => boolean;
    requestPIP(): boolean;
    /**
     * 退出画中画
     */
    exitPIP(): boolean;
    get isPip(): boolean;
    isPIPAvailable(): boolean;
    render(): string;
}
import IconPlugin from "../common/iconPlugin";
