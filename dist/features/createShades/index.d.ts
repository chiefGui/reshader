/**
 * `createShades` returns the shades from `color`
 *
 * @param color the color the shades will be created from
 * @param options.contrastRatio (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
 */
export declare function createShades(color: string, options?: ICreateShadesOptions): IShades;
interface ICreateShadesOptions {
    contrastRatio: number;
}
export interface IShades {
    darkest: string;
    darker: string;
    dark: string;
    lightest: string;
    lighter: string;
    light: string;
    neutral: string;
}
export {};