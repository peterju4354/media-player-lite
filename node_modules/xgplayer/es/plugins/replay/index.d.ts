export default Replay;
declare class Replay extends Plugin {
    static get defaultConfig(): {
        disable: boolean;
    };
    registerIcons(): {
        replay: any;
    };
    __handleReplay: any;
    handleReplay(e: any): void;
    show(): void;
    enable(): void;
    disable(): void;
    render(): string;
}
import Plugin from "../../plugin";
