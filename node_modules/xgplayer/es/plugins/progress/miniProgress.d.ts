export default MiniProgress;
declare class MiniProgress extends Plugin {
    update(data: {
        cached: number;
        played: number;
    }, duration: any): void;
    render(): string;
}
import Plugin from "../../plugin";
