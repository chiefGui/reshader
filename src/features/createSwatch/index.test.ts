import test from "ava"

import { createShades } from "../createShades"
import { createSwatch, ISwatch, EXCEPTION__NO_NEUTRAL } from "."
import { EXCEPTION__UNDEFINED_SHADES } from "./index"
import { format } from "src/utils/format"

test("throw exception when argument shades is undefined", t => {
  const exceptionError = t.throws(() => {
    createSwatch(({ shades: undefined } as unknown) as ISwatch)
  }, Error)

  t.is(exceptionError.message, EXCEPTION__UNDEFINED_SHADES)
})

test("throw exception when argument shades does not have neutral shade", t => {
  const exceptionError = t.throws(() => {
    createSwatch(({ shades: { darkest: "#FF00FF" } } as unknown) as ISwatch)
  }, Error)

  const objectAsString = `{
  "darkest": "#FF00FF"
}`

  t.is(exceptionError.message, format(EXCEPTION__NO_NEUTRAL, objectAsString))
})

test("return swatch with specific formal name", t => {
  const shades = createShades("#67FF71")

  const EXPECTED_SWATCH: ISwatch = {
    formalName: "Screamin' Green",
    hydratedName: "screaminGreen",
    shades,
    contrastRatio: 0.2,
  }

  const swatch = createSwatch({ formalName: "Screamin' Green", shades })

  t.deepEqual(swatch, EXPECTED_SWATCH)
})

test("return swatch with generated formal name", t => {
  const shades = createShades("#67FF71")

  const EXPECTED_SWATCH: ISwatch = {
    formalName: "Screamin' Green",
    hydratedName: "screaminGreen",
    shades,
    contrastRatio: 0.2,
  }

  const swatch = createSwatch({ shades })

  t.deepEqual(swatch, EXPECTED_SWATCH)
})

test("return swatch with custom contrast ratio", t => {
  const CUSTOM_CONTRAST_RATIO = 0.5
  const shades = createShades("#67FF71", {
    contrastRatio: CUSTOM_CONTRAST_RATIO,
  })

  const EXPECTED_SWATCH: ISwatch = {
    formalName: "Screamin' Green",
    hydratedName: "screaminGreen",
    shades,
    contrastRatio: CUSTOM_CONTRAST_RATIO,
  }

  const swatch = createSwatch({ shades, contrastRatio: CUSTOM_CONTRAST_RATIO })

  t.deepEqual(swatch, EXPECTED_SWATCH)
})
