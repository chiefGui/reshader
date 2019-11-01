import test from "ava"

import { createShades, IShades } from "."
import { INVALID_COLOR_STRING } from "src/exceptionMessages"

test("throw exception when color is invalid", t => {
  const exceptionError = t.throws(() => {
    createShades("hello world")
  }, Error)

  t.is(exceptionError.message, INVALID_COLOR_STRING)
})

test("return shades from #FF00FF color", t => {
  const EXPECTED_SHADES: IShades = {
    darkest: "#580057",
    darker: "#7D007D",
    dark: "#B300B2",

    neutral: "#FF00FF",

    light: "#FF4DFF",
    lighter: "#FFB1FF",
    lightest: "#FFFFFF",
  }

  t.deepEqual(createShades("#FF00FF"), EXPECTED_SHADES)
})
