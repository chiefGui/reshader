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
      darkest: "#820082",
      darker: "#A300A3",
      dark: "#CC00CC",
      neutral: "#FF00FF",
      light: "#FF33FF",
      lighter: "#FF70FF",
      lightest: "#FFB9FF",
    },

    cyan: {
      darkest: "#008282",
      darker: "#00A3A3",
      dark: "#00CCCC",
      neutral: "#00FFFF",
      light: "#33FFFF",
      lighter: "#70FFFF",
      lightest: "#B9FFFF",
    },
  }

  const actualPalette = createPalette({ magenta: "#FF00FF", cyan: "#00FFFF" })

  t.deepEqual(actualPalette, EXPECTED_PALETTE)
})

test("return shades for each color with 0.5 (non-default) contrast", t => {
  const EXPECTED_PALETTE = {
    magenta: {
      darkest: "#820082",
      darker: "#A300A3",
      dark: "#CC00CC",
      neutral: "#FF00FF",
      light: "#FF33FF",
      lighter: "#FF70FF",
      lightest: "#FFB9FF",
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
