import { ISwatch } from "src/features/createSwatch"

export function parsePaletteToJSON(palette: ISwatch[]): string {
  return `{
${palette
  .map(
    (swatch, index) => `  "${swatch.hydratedName}": {
    "darkest": "${swatch.shades.darkest}",
    "darker": "${swatch.shades.darker}",
    "dark": "${swatch.shades.dark}",
    "neutral": "${swatch.shades.neutral}",
    "light": "${swatch.shades.light}",
    "lighter": "${swatch.shades.lighter}",
    "lightest": "${swatch.shades.lightest}"
  }${index !== palette.length - 1 ? "," : ""}`,
  )
  .join("\n\n")}
}`
}
