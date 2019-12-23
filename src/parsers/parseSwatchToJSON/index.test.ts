import test from "ava"

import { parseSwatchToJSON } from "."
import { createShades } from "src/features/createShades"
import { createSwatch } from "../../features/createSwatch/index"

test("return a JSON-parsed Swatch", t => {
  const EXPECTED_JSON: string = (`{
  "magentaFuchsia": {
    "darkest": "#820082",
    "darker": "#A300A3",
    "dark": "#CC00CC",
    "neutral": "#FF00FF",
    "light": "#FF33FF",
    "lighter": "#FF70FF",
    "lightest": "#FFB9FF"
  }
}` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#FF00FF"),
  })

  t.deepEqual(
    parseSwatchToJSON(swatch),

    EXPECTED_JSON,
  )
})

test("return a valid JSON with hydrated Swatch name", t => {
  const EXPECTED_JSON: string = (`{
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

  const swatch = createSwatch({
    shades: createShades("#E3C3F5"),
  })

  t.deepEqual(
    parseSwatchToJSON(swatch),

    EXPECTED_JSON,
  )
})

test("return a valid JSON with spaced Swatch", t => {
  const EXPECTED_JSON: string = (`  {
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

  const swatch = createSwatch({
    shades: createShades("#9EDBB6"),
  })

  t.deepEqual(
    parseSwatchToJSON(swatch, { numberOfSpaces: 2 }),

    EXPECTED_JSON,
  )
})
