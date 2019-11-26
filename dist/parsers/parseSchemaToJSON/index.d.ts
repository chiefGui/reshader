import { ISchema } from "../../features/schema";
export declare function parseSchemaToJSON(schema: ISchema, options?: IParseSchemaToJSONOptions): string;
export declare const EXCEPTION__NO_NEUTRAL = "You are trying to parse a Reshader Schema to JSON,\nbut no \"neutral\" shade was found. Instead, this is what we got: (\"%s\").\nPlease, make sure you have a \"neutral\" shade present in the object of the very first argument\nof `parseSchemaToJSON`.\n\nA good way to have a valid Schema, is to generate the shades using the function `createShades`\nfrom this same engine. (import { createShades } from \"@reshader/engine\")\n";
interface IParseSchemaToJSONOptions {
    numberOfSpaces: number;
}
export {};
