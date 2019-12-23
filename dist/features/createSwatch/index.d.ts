import { IShades } from "../createShades";
export declare function createSwatch({ formalName, shades, contrastRatio, }: TCreateSwatch): ISwatch;
export interface ISwatch {
    formalName: string;
    hydratedName: string;
    shades: IShades;
    contrastRatio: number;
}
declare type TCreateSwatch = Pick<ISwatch, "shades"> & {
    formalName?: string;
    contrastRatio?: number;
};
export declare const EXCEPTION__UNDEFINED_SHADES = "\"createSwatch\" requires at least the argument \"shades\"";
export declare const EXCEPTION__NO_NEUTRAL = "You are trying to run \"createSwatch\" without passing the \"neutral\" shade\nthrough the \"shades\" property. What we actually got is this: (\"%s\").\nPlease, make sure the shade \"neutral\" is present and is a valid hex code.";
export {};
