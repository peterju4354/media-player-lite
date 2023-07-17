export default Poster;
export type IPosterConfig = {
    isEndedShow?: boolean;
    hideCanplay?: boolean;
    poster?: string;
};
/**
 * @typedef {{
 *   isEndedShow?: boolean, // 是否在播放结束之后显示
 *   hideCanplay?: boolean, // cnaplay 时间大于1的时候才隐藏
 *   poster?: string // 封面图地址
 * }} IPosterConfig
 */
declare class Poster extends Plugin {
    /**
     * @type IPosterConfig
     */
    static get defaultConfig(): IPosterConfig;
    set isEndedShow(arg: any);
    get isEndedShow(): any;
    show(): void;
    beforeCreate(args: any): void;
    onTimeUpdate(): void;
    update(poster: any): void;
    render(): string;
}
import Plugin from "../../plugin";
