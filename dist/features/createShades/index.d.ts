/**
 * `createShades` returns the shades from `color`
 *
 * @param color the color the shades will be created from
 * @param options.contrastRatio (default: 0.1) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
 */
export declare function createShades(color: string, options?: ICreateShadesOptions): IShades;
export declare const EXCEPTION__INVALID_COLOR_STRING = "You are passing an invalid or malformed color string (%s).\nTo learn more about our algorithm for hexadecimal color strings,\nplease refer to https://stackoverflow.com/a/9682781.\n";
export declare const EXCEPTION__INVALID_CREATE_SHADES_OPTIONS = "You passed some invalid options when generating shades (%s).\nPlease refer to https://github.com/chiefGui/reshader to know more\nabout the available, valid options.\n";
export interface ICreateShadesOptions {
    /**
     * `contrastRatio`
     * (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
     */
    contrastRatio?: number;
}
export interface IShades {
    darkest: string;
    darker: string;
    dark: string;
    neutral: string;
    light: string;
    lighter: string;
    lightest: string;
}
