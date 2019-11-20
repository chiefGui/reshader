import Color from "color"

import { isValidHexColor, format } from "src/utils"
import {
  INVALID_COLOR_STRING,
  INVALID_CREATE_SHADES_OPTION,
} from "src/exceptionMessages"

const DEFAULT_CONTRAST_RATIO = 0.3

/**
 * `createShades` returns the shades from `color`
 *
 * @param color the color the shades will be created from
 * @param options.contrastRatio (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
 */
export function createShades(
  color: string,
  options: ICreateShadesOptions = defaultCreateShadesOptions,
): IShades {
  if (!isValidHexColor(color)) {
    throw new Error(format(INVALID_COLOR_STRING, `"${color.toString()}"`))
  }

  const invalidOptionNames = getInvalidOptionsNames(options)
  if (invalidOptionNames.length > 0) {
    throw new Error(
      format(
        INVALID_CREATE_SHADES_OPTION,
        `"${invalidOptionNames.join(", ")}"`,
      ),
    )
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

    neutral: color,

    light,
    lighter,
    lightest,
  }
}

const defaultCreateShadesOptions: ICreateShadesOptions = {
  contrastRatio: DEFAULT_CONTRAST_RATIO,
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

function getInvalidOptionsNames(
  createShadesOptions: ICreateShadesOptions,
): string[] {
  const dirtyOptionsNames = Object.keys(createShadesOptions)
  const validOptionsNames = Object.keys(defaultCreateShadesOptions)

  if (dirtyOptionsNames.length === 0) {
    return []
  }

  const invalidOptionsNames: string[] = dirtyOptionsNames.filter(
    dirtyOptionName => {
      if (!validOptionsNames.includes(dirtyOptionName)) {
        return true
      }

      return false
    },
  )

  return invalidOptionsNames
}

export interface ICreateShadesOptions {
  /**
   * `contrastRatio`
   * (default: 0.3) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
   */
  contrastRatio?: number
}

export interface IShades {
  darkest: string
  darker: string
  dark: string
  neutral: string
  light: string
  lighter: string
  lightest: string
}
