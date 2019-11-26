import { ISchema } from "../../features/schema"
import { format } from "../../utils/format/index"

export function parseSchemaToJSON(
  schema: ISchema,
  options: IParseSchemaToJSONOptions = {
    numberOfSpaces: 0,
  },
): string {
  const schemaName = Object.keys(schema)[0]

  if (!schema[schemaName].neutral) {
    throw new Error(
      format(EXCEPTION__NO_NEUTRAL, JSON.stringify(schema, null, 2)),
    )
  }

  const hydratedSchemaName = schemaName
    .trim()
    // camelize
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")

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
${schemaNameSpaces}"${hydratedSchemaName}": {
${shadeSpaces}"darkest": "${schema[schemaName].darkest}",
${shadeSpaces}"darker": "${schema[schemaName].darker}",
${shadeSpaces}"dark": "${schema[schemaName].dark}",
${shadeSpaces}"neutral": "${schema[schemaName].neutral}",
${shadeSpaces}"light": "${schema[schemaName].light}",
${shadeSpaces}"lighter": "${schema[schemaName].lighter}",
${shadeSpaces}"lightest": "${schema[schemaName].lightest}"
${schemaNameSpaces}}
${bracketSpaces}}`
}

function getSpaces(numberOfSpaces: number): string {
  return new Array(numberOfSpaces).fill(" ").join("")
}

export const EXCEPTION__NO_NEUTRAL = `You are trying to parse a Reshader Schema to JSON,
but no "neutral" shade was found. Instead, this is what we got: ("%s").
Please, make sure you have a "neutral" shade present in the object of the very first argument
of \`parseSchemaToJSON\`.

A good way to have a valid Schema, is to generate the shades using the function \`createShades\`
from this same engine. (import { createShades } from "@reshader/engine")
`

interface IParseSchemaToJSONOptions {
  numberOfSpaces: number
}
