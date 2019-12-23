import test from "ava"

import { parseSwatchToJS } from "."
import { createSwatch, createShades } from "../../features"

test("return a JS object-parsed Swatch", t => {
  const EXPECTED_JS: string = (`{
  magentaFuchsia: {
    darkest: "#820082",
    darker: "#A300A3",
    dark: "#CC00CC",
    neutral: "#FF00FF",
    light: "#FF33FF",
    lighter: "#FF70FF",
    lightest: "#FFB9FF"
  }
}` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#FF00FF"),
  })

  t.deepEqual(
    parseSwatchToJS(swatch),

    EXPECTED_JS,
  )
})

test("return a valid JS object with hydrated Swatch name", t => {
  const EXPECTED_JS: string = (`{
  moonRaker: {
    darkest: "#8821C1",
    darker: "#A43CDE",
    dark: "#C078E8",
    neutral: "#E3C3F5",
    light: "#FFFFFF",
    lighter: "#FFFFFF",
    lightest: "#FFFFFF"
  }
}` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#E3C3F5"),
  })

  t.deepEqual(
    parseSwatchToJS(swatch),

    EXPECTED_JS,
  )
})

test("return a valid JS object with spaced Swatch", t => {
  const EXPECTED_JS: string = (`  {
    vistaBlue: {
      darkest: "#348E57",
      darker: "#41B16D",
      dark: "#67C78D",
      neutral: "#9EDBB6",
      light: "#D5EFDF",
      lighter: "#FFFFFF",
      lightest: "#FFFFFF"
    }
  }` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#9EDBB6"),
  })

  t.deepEqual(
    parseSwatchToJS(swatch, { numberOfSpaces: 2 }),

    EXPECTED_JS,
  )
})
