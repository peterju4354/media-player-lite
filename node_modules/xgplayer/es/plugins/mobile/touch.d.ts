export default Touche;
declare class Touche {
    constructor(dom: any, config?: {
        eventType: string;
    });
    _pos: {
        moving: boolean;
        start: boolean;
        x: number;
        y: number;
    };
    config: {
        pressDelay: number;
        dbClickDelay: number;
        disablePress: boolean;
        disableDbClick: boolean;
        miniStep: number;
        needPreventDefault: boolean;
    };
    root: any;
    events: {
        start: string;
        end: string;
        move: string;
        cancel: string;
    };
    pressIntrvalId: NodeJS.Timeout;
    dbIntrvalId: NodeJS.Timeout;
    __handlers: {};
    _initEvent(): void;
    onTouchStart(e: any): void;
    onTouchMove(e: any): void;
    onTouchEnd(e: any): void;
    onTouchCancel(e: any): void;
    __setPress(e: any): void;
    __clearPress(): void;
    __setDb(e: any): void;
    __clearDb(): void;
    on(event: any, handler: any): void;
    off(event: any, handler: any): void;
    trigger(event: any, e: any): void;
    destroy(): void;
}
