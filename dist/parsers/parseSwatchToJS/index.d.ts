import { ISwatch } from "src/features/createSwatch";
export declare function parseSwatchToJS(swatch: ISwatch, options?: IParseSwatchToJSOptions): string;
interface IParseSwatchToJSOptions {
    numberOfSpaces: number;
}
export {};
