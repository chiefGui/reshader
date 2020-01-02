import { ISwatch } from "src/features/createSwatch"

export function parsePaletteToJS(palette: ISwatch[]): string {
  return `{
${palette
  .map(
    swatch => `  ${swatch.hydratedName}: {
    darkest: "${swatch.shades.darkest}",
    darker: "${swatch.shades.darker}",
    dark: "${swatch.shades.dark}",
    neutral: "${swatch.shades.neutral}",
    light: "${swatch.shades.light}",
    lighter: "${swatch.shades.lighter}",
    lightest: "${swatch.shades.lightest}",
  },`,
  )
  .join("\n\n")}
}`
}
