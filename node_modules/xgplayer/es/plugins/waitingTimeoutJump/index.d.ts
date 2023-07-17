export default class WaitingTimeoutJump extends BasePlugin {
    static get defaultConfig(): {
        useWaitingTimeoutJump: boolean;
        waitingTime: number;
        jumpSize: number;
        jumpCntMax: number;
    };
    hasPlayed: boolean;
    jumpCnt: number;
    timer: NodeJS.Timeout;
    jumpSize: any;
    onWaiting: () => void;
    onJump: () => void;
}
import BasePlugin from "../../plugin";
