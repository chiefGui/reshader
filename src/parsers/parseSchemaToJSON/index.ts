import { ISchema } from "src/features/createSchema"

export function parseSchemaToJSON(
  schema: ISchema,
  options: IParseSchemaToJSONOptions = {
    numberOfSpaces: 0,
  },
): string {
  const bracketSpaces =
    options.numberOfSpaces === 0 ? "" : getSpaces(options.numberOfSpaces)

  const schemaNameSpaces =
    options.numberOfSpaces === 0
      ? "  "
      : bracketSpaces + getSpaces(options.numberOfSpaces)

  const shadeSpaces =
    options.numberOfSpaces === 0
      ? "    "
      : schemaNameSpaces + getSpaces(options.numberOfSpaces)

  return `${bracketSpaces}{
${schemaNameSpaces}"${schema.hydratedName}": {
${shadeSpaces}"darkest": "${schema.shades.darkest}",
${shadeSpaces}"darker": "${schema.shades.darker}",
${shadeSpaces}"dark": "${schema.shades.dark}",
${shadeSpaces}"neutral": "${schema.shades.neutral}",
${shadeSpaces}"light": "${schema.shades.light}",
${shadeSpaces}"lighter": "${schema.shades.lighter}",
${shadeSpaces}"lightest": "${schema.shades.lightest}"
${schemaNameSpaces}}
${bracketSpaces}}`
}

function getSpaces(numberOfSpaces: number): string {
  return new Array(numberOfSpaces).fill(" ").join("")
}

interface IParseSchemaToJSONOptions {
  numberOfSpaces: number
}
