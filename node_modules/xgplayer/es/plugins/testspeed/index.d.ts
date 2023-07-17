export default class TestSpeed extends BasePlugin {
    static get defaultConfig(): {
        openSpeed: boolean;
        testCnt: number;
        loadSize: number;
        testTimeStep: number;
        url: string;
        saveSpeedMax: number;
    };
    getSpeed: (speedList: any) => number;
    speedListCache: any[];
    timer: NodeJS.Timeout;
    cnt: number;
    xhr: XMLHttpRequest;
    _onRealSpeedChange: (data: any) => void;
    testSpeed: () => void;
    appendList: (speed: any) => void;
    updateSpeed: () => void;
    set openSpeed(arg: any);
    get openSpeed(): any;
}
import BasePlugin from "../../plugin";
