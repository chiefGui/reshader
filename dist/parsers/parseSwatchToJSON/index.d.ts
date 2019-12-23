import { ISwatch } from "src/features/createSwatch";
export declare function parseSwatchToJSON(swatch: ISwatch, options?: IParseSwatchToJSONOptions): string;
interface IParseSwatchToJSONOptions {
    numberOfSpaces: number;
}
export {};
