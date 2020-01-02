import test from "ava"

import { parsePaletteToJS } from "."
import { createSwatch, createShades } from "../../features"

test("return a parsed JS object Palette with only one swatch", t => {
  const EXPECTED_JS: string = (`{
  magentaFuchsia: {
    darkest: "#820082",
    darker: "#A300A3",
    dark: "#CC00CC",
    neutral: "#FF00FF",
    light: "#FF33FF",
    lighter: "#FF70FF",
    lightest: "#FFB9FF",
  },
}` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#FF00FF"),
  })

  t.deepEqual(
    parsePaletteToJS([swatch]),

    EXPECTED_JS,
  )
})

test("return a parsed JS object Palette with multiple swatches", t => {
  const EXPECTED_JS: string = (`{
  moonRaker: {
    darkest: "#8821C1",
    darker: "#A43CDE",
    dark: "#C078E8",
    neutral: "#E3C3F5",
    light: "#FFFFFF",
    lighter: "#FFFFFF",
    lightest: "#FFFFFF",
  },

  magentaFuchsia: {
    darkest: "#820082",
    darker: "#A300A3",
    dark: "#CC00CC",
    neutral: "#FF00FF",
    light: "#FF33FF",
    lighter: "#FF70FF",
    lightest: "#FFB9FF",
  },
}` as unknown) as string

  const swatches = [
    createSwatch({
      shades: createShades("#E3C3F5"),
    }),

    createSwatch({
      shades: createShades("#FF00FF"),
    }),
  ]

  t.deepEqual(
    parsePaletteToJS(swatches),

    EXPECTED_JS,
  )
})
