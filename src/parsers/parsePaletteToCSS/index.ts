import { ISwatch } from "src/features/createSwatch"

export function parsePaletteToCSS(palette: ISwatch[]): string {
  return `:root {
${palette
  .map(
    swatch => `  --palette-${swatch.hydratedName}--darkest: ${swatch.shades.darkest};
  --palette-${swatch.hydratedName}--darker: ${swatch.shades.darker};
  --palette-${swatch.hydratedName}--dark: ${swatch.shades.dark};
  --palette-${swatch.hydratedName}--neutral: ${swatch.shades.neutral};
  --palette-${swatch.hydratedName}--light: ${swatch.shades.light};
  --palette-${swatch.hydratedName}--lighter: ${swatch.shades.lighter};
  --palette-${swatch.hydratedName}--lightest: ${swatch.shades.lightest};`,
  )
  .join("\n\n")}
}`
}
