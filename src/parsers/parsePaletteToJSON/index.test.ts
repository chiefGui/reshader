import test from "ava"

import { parsePaletteToJSON } from "."
import { createShades } from "src/features/createShades"
import { createSwatch } from "../../features/createSwatch/index"

test("return a JSON-parsed Palette with one Swatch", t => {
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

  const palette = [
    createSwatch({
      shades: createShades("#FF00FF"),
    }),
  ]

  t.deepEqual(
    parsePaletteToJSON(palette),

    EXPECTED_JSON,
  )
})

test("return a JSON-parsed Palette with multiple Swatches", t => {
  const EXPECTED_JSON: string = (`{
  "magentaFuchsia": {
    "darkest": "#820082",
    "darker": "#A300A3",
    "dark": "#CC00CC",
    "neutral": "#FF00FF",
    "light": "#FF33FF",
    "lighter": "#FF70FF",
    "lightest": "#FFB9FF"
  },

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

  const palette = [
    createSwatch({
      shades: createShades("#FF00FF"),
    }),

    createSwatch({
      shades: createShades("#FF00FF"),
    }),
  ]

  t.deepEqual(
    parsePaletteToJSON(palette),

    EXPECTED_JSON,
  )
})
