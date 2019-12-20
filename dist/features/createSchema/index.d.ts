import { IShades } from "../createShades";
export declare function createSchema({ formalName, shades, contrastRatio, }: TCreateSchema): ISchema;
export interface ISchema {
    formalName: string;
    hydratedName: string;
    shades: IShades;
    contrastRatio: number;
}
declare type TCreateSchema = Pick<ISchema, "shades"> & {
    formalName?: string;
    contrastRatio?: number;
};
export declare const EXCEPTION__UNDEFINED_SHADES = "\"createSchema\" requires at least the argument \"shades\"";
export declare const EXCEPTION__NO_NEUTRAL = "You are trying to run \"createSchema\" without passing the \"neutral\" shade\nthrough the \"shades\" property. What we actually got is this: (\"%s\").\nPlease, make sure the shade \"neutral\" is present and is a valid hex code.";
export {};
