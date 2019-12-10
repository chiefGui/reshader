import Color from "color"

import { isValidHexColor, format } from "src/utils"

const DEFAULT_CONTRAST_RATIO = 0.2

/**
 * `createShades` returns the shades from `color`
 *
 * @param color the color the shades will be created from
 * @param options.contrastRatio (default: 0.1) from 0.1 to 1, how strong the contrast between shades will look like (0.1 is the slightest, 1 is the strongest)
 */
export function createShades(
  color: string,
  options: ICreateShadesOptions = defaultCreateShadesOptions,
): IShades {
  if (!isValidHexColor(color)) {
    throw new Error(
      format(EXCEPTION__INVALID_COLOR_STRING, `"${color.toString()}"`),
    )
  }

  const invalidOptionNames = getInvalidOptionsNames(options)
  if (invalidOptionNames.length > 0) {
    throw new Error(
      format(
        EXCEPTION__INVALID_CREATE_SHADES_OPTIONS,
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

    neutral: color.toUpperCase(),

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

export const EXCEPTION__INVALID_COLOR_STRING = `You are passing an invalid or malformed color string (%s).
To learn more about our algorithm for hexadecimal color strings,
please refer to https://stackoverflow.com/a/9682781.
`

export const EXCEPTION__INVALID_CREATE_SHADES_OPTIONS = `You passed some invalid options when generating shades (%s).
Please refer to https://github.com/chiefGui/reshader to know more
about the available, valid options.
`

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
