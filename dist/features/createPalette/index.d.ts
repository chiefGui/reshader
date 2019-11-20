import { IShades, ICreateShadesOptions } from "../createShades";
/**
 * `createPalette` returns shades for every color present on its first argument.
 *
 * @param {string | TColorsShape} colors - The colors you want to generate shades from.
 */
export declare function createPalette<TColors extends TColorsShape>(colors: TColors): TPalette<TColors>;
declare type TColorsShape = {
    [colorName: string]: string | IColorShape;
};
interface IColorShape {
    /**
     * A valid hexadecimal string that represents a given color.
     * Passing an invalid value here will throw an exception.
     */
    hex: string;
    /**
     * The options used to generate the shades for this given color.
     * Same as the options of `createShades`, as seen in `ICreateShadesOptions`.
     */
    options?: ICreateShadesOptions;
}
declare type TPalette<TColors extends TColorsShape> = {
    [colorName in keyof TColors]: IShades;
};
export {};
