import { ISwatch } from "src/features/createSwatch"

export function parseSwatchToCSS(
  swatch: ISwatch,
  options: IParseSwatchToCSSOptions = {
    numberOfSpaces: 0,
  },
): string {
  const bracketSpaces =
    options.numberOfSpaces === 0 ? "" : getSpaces(options.numberOfSpaces)

  const swatchNameSpaces =
    options.numberOfSpaces === 0
      ? "  "
      : bracketSpaces + getSpaces(options.numberOfSpaces)

  const shadeSpaces =
    options.numberOfSpaces === 0
      ? "    "
      : swatchNameSpaces + getSpaces(options.numberOfSpaces)

  return `:root {
  --palette-${swatch.hydratedName}--darkest: ${swatch.shades.darkest};
  --palette-${swatch.hydratedName}--darker: ${swatch.shades.darker};
  --palette-${swatch.hydratedName}--dark: ${swatch.shades.dark};
  --palette-${swatch.hydratedName}--neutral: ${swatch.shades.neutral};
  --palette-${swatch.hydratedName}--light: ${swatch.shades.light};
  --palette-${swatch.hydratedName}--lighter: ${swatch.shades.lighter};
  --palette-${swatch.hydratedName}--lightest: ${swatch.shades.lightest};
}`
}

function getSpaces(numberOfSpaces: number): string {
  return new Array(numberOfSpaces).fill(" ").join("")
}

interface IParseSwatchToCSSOptions {
  numberOfSpaces: number
}
