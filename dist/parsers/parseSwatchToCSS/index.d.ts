import { ISwatch } from "src/features/createSwatch";
export declare function parseSwatchToCSS(swatch: ISwatch, options?: IParseSwatchToCSSOptions): string;
interface IParseSwatchToCSSOptions {
    numberOfSpaces: number;
}
export {};
