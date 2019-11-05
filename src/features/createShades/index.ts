import Color from "color"

import { isValidHexColor } from "src/utils"
import { INVALID_COLOR_STRING } from "src/exceptionMessages"

const DEFAULT_CONTRAST_RATIO = 0.3

/**
 * `createShades` returns the shades from `color`
 *
 * @param color the color the shades will be created from
 * @param options.contrastRatio (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
 */
export function createShades(
  color: string,
  options: ICreateShadesOptions = {
    contrastRatio: DEFAULT_CONTRAST_RATIO,
  },
): IShades {
  if (!isValidHexColor(color)) {
    throw new Error(INVALID_COLOR_STRING)
  }

  const dark = getDarkerShadeFromColor(color, options.contrastRatio)
  const darker = getDarkerShadeFromColor(dark, options.contrastRatio)
  const darkest = getDarkerShadeFromColor(darker, options.contrastRatio)

  const light = getLighterShadeFromColor(color, options.contrastRatio)
  const lighter = getLighterShadeFromColor(light, options.contrastRatio)
  const lightest = getLighterShadeFromColor(lighter, options.contrastRatio)

  return {
    darkest,
    darker,
    dark,

    lightest,
    lighter,
    light,

    neutral: color,
  }
}

function getLighterShadeFromColor(
  color: string,
  contrastRatio: number = DEFAULT_CONTRAST_RATIO,
): string {
  return Color(color)
    .lighten(contrastRatio)
    .hex()
}

function getDarkerShadeFromColor(
  color: string,
  contrastRatio: number = DEFAULT_CONTRAST_RATIO,
): string {
  return Color(color)
    .darken(contrastRatio)
    .hex()
}

export interface ICreateShadesOptions {
  /**
   * `contrastRatio`
   * (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
   */
  contrastRatio: number
}

export interface IShades {
  darkest: string
  darker: string
  dark: string
  lightest: string
  lighter: string
  light: string
  neutral: string
}
