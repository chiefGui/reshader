import { ISchema } from "src/features/createSchema";
export declare function parseSchemaToJSON(schema: ISchema, options?: IParseSchemaToJSONOptions): string;
interface IParseSchemaToJSONOptions {
    numberOfSpaces: number;
}
export {};
