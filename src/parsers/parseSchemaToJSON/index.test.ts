import test from "ava"

import { parseSchemaToJSON, EXCEPTION__NO_NEUTRAL } from "./index"
import { createShades } from "../../features/createShades/index"
import { format } from "../../utils/format/index"
import { ISchema } from "../../features/schema"

test("throw exception when Schema doesn't have the neutral shade", t => {
  const exceptionError = t.throws(() => {
    parseSchemaToJSON(({ Black: { darkest: "#000" } } as unknown) as ISchema)
  }, Error)

  const objectAsString = `{
  "Black": {
    "darkest": "#000"
  }
}`

  t.is(exceptionError.message, format(EXCEPTION__NO_NEUTRAL, objectAsString))
})

test("return a JSON-parsed Schema", t => {
  const EXPECTED_SCHEMA: string = (`{
  "magenta": {
    "darkest": "#820082",
    "darker": "#A300A3",
    "dark": "#CC00CC",
    "neutral": "#FF00FF",
    "light": "#FF33FF",
    "lighter": "#FF70FF",
    "lightest": "#FFB9FF"
  }
}` as unknown) as string

  t.deepEqual(
    parseSchemaToJSON({
      Magenta: createShades("#FF00FF"),
    }),

    EXPECTED_SCHEMA,
  )
})

test("return a valid JSON with hydrated Schema name", t => {
  const EXPECTED_SCHEMA: string = (`{
  "moonRaker": {
    "darkest": "#8821C1",
    "darker": "#A43CDE",
    "dark": "#C078E8",
    "neutral": "#E3C3F5",
    "light": "#FFFFFF",
    "lighter": "#FFFFFF",
    "lightest": "#FFFFFF"
  }
}` as unknown) as string

  t.deepEqual(
    parseSchemaToJSON({
      "Moon Raker": createShades("#E3C3F5"),
    }),

    EXPECTED_SCHEMA,
  )
})

test("return a valid JSON with spaced Schema", t => {
  const EXPECTED_SCHEMA: string = (`  {
    "vistaBlue": {
      "darkest": "#348E57",
      "darker": "#41B16D",
      "dark": "#67C78D",
      "neutral": "#9EDBB6",
      "light": "#D5EFDF",
      "lighter": "#FFFFFF",
      "lightest": "#FFFFFF"
    }
  }` as unknown) as string

  t.deepEqual(
    parseSchemaToJSON(
      {
        "Vista Blue": createShades("#9EDBB6"),
      },
      { numberOfSpaces: 2 },
    ),

    EXPECTED_SCHEMA,
  )
})
