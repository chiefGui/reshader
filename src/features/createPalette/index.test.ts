import test from "ava"

import { createPalette } from "."
import { format } from "src/utils"
import { EXCEPTION__INVALID_COLOR_STRING } from "../createShades/index"

test("throw exception when color value is invalid", t => {
  const exceptionError = t.throws(() => {
    createPalette({
      magenta: "magenta",
    })
  }, Error)

  t.is(
    exceptionError.message,
    format(EXCEPTION__INVALID_COLOR_STRING, `"magenta"`),
  )
})

test("throw exception when color hex value is invalid", t => {
  const exceptionError = t.throws(() => {
    createPalette({
      magenta: {
        hex: "magenta",
      },
    })
  }, Error)

  t.is(
    exceptionError.message,
    format(EXCEPTION__INVALID_COLOR_STRING, `"magenta"`),
  )
})

test("return shades for each color", t => {
  const EXPECTED_PALETTE = {
    magenta: {
      darkest: "#580057",
      darker: "#7D007D",
      dark: "#B300B2",
      neutral: "#FF00FF",
      light: "#FF4DFF",
      lighter: "#FFB1FF",
      lightest: "#FFFFFF",
    },

    cyan: {
      darkest: "#005758",
      darker: "#007D7D",
      dark: "#00B2B3",
      neutral: "#00FFFF",
      light: "#4DFFFF",
      lighter: "#B1FFFF",
      lightest: "#FFFFFF",
    },
  }

  const actualPalette = createPalette({ magenta: "#FF00FF", cyan: "#00FFFF" })

  t.deepEqual(actualPalette, EXPECTED_PALETTE)
})

test("return shades for each color with 0.5 (non-default) contrast", t => {
  const EXPECTED_PALETTE = {
    magenta: {
      darkest: "#580057",
      darker: "#7D007D",
      dark: "#B300B2",
      neutral: "#FF00FF",
      light: "#FF4DFF",
      lighter: "#FFB1FF",
      lightest: "#FFFFFF",
    },

    cyan: {
      darkest: "#002020",
      darker: "#003F40",
      dark: "#007F80",
      neutral: "#00FFFF",
      light: "#80FFFF",
      lighter: "#FFFFFF",
      lightest: "#FFFFFF",
    },
  }

  const actualPalette = createPalette({
    magenta: "#FF00FF",
    cyan: {
      hex: "#00FFFF",
      options: {
        contrastRatio: 0.5,
      },
    },
  })

  t.deepEqual(actualPalette, EXPECTED_PALETTE)
})
