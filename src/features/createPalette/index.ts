import { createShades, IShades, ICreateShadesOptions } from "../createShades"

/**
 * `createPalette` returns shades for every color present on its first argument.
 *
 * @param {string | TColorsShape} colors - The colors you want to generate shades from.
 */
export function createPalette<TColors extends TColorsShape>(
  colors: TColors,
): TPalette<TColors> {
  const colorNames = Object.keys(colors) as (keyof TColors)[]

  return colorNames.reduce(
    (previousColor, currentColor) => {
      /**
       * Let's normalize the color input
       */
      const colorShape = getColorShape(colors[currentColor])

      previousColor[currentColor] = createShades(
        colorShape.hex,
        colorShape.options,
      )

      return previousColor
    },
    {} as TPalette<TColors>,
  )
}

function getColorShape(color: string | IColorShape): IColorShape {
  if (typeof color === "string") {
    return {
      hex: color,
      options: {},
    }
  }

  return color
}

type TColorsShape = { [colorName: string]: string | IColorShape }

interface IColorShape {
  /**
   * A valid hexadecimal string that represents a given color.
   * Passing an invalid value here will throw an exception.
   */
  hex: string

  /**
   * The options used to generate the shades for this given color.
   * Same as the options of `createShades`, as seen in `ICreateShadesOptions`.
   */
  options?: ICreateShadesOptions
}

export type TPalette<TColors extends TColorsShape> = {
  [colorName in keyof TColors]: IShades
}
