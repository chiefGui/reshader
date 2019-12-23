import { ISwatch } from "src/features/createSwatch"

export function parseSwatchToJS(
  swatch: ISwatch,
  options: IParseSwatchToJSOptions = {
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

  return `${bracketSpaces}{
${swatchNameSpaces}${swatch.hydratedName}: {
${shadeSpaces}darkest: "${swatch.shades.darkest}",
${shadeSpaces}darker: "${swatch.shades.darker}",
${shadeSpaces}dark: "${swatch.shades.dark}",
${shadeSpaces}neutral: "${swatch.shades.neutral}",
${shadeSpaces}light: "${swatch.shades.light}",
${shadeSpaces}lighter: "${swatch.shades.lighter}",
${shadeSpaces}lightest: "${swatch.shades.lightest}"
${swatchNameSpaces}}
${bracketSpaces}}`
}

function getSpaces(numberOfSpaces: number): string {
  return new Array(numberOfSpaces).fill(" ").join("")
}

interface IParseSwatchToJSOptions {
  numberOfSpaces: number
}
