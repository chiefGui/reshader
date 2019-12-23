import test from "ava"

import { parseSwatchToCSS } from "."
import { createSwatch, createShades } from "../../features"

test("return a CSS-parsed Swatch", t => {
  const EXPECTED_CSS: string = (`:root {
  --palette-magentaFuchsia--darkest: #820082;
  --palette-magentaFuchsia--darker: #A300A3;
  --palette-magentaFuchsia--dark: #CC00CC;
  --palette-magentaFuchsia--neutral: #FF00FF;
  --palette-magentaFuchsia--light: #FF33FF;
  --palette-magentaFuchsia--lighter: #FF70FF;
  --palette-magentaFuchsia--lightest: #FFB9FF;
}` as unknown) as string

  const swatch = createSwatch({
    shades: createShades("#FF00FF"),
  })

  t.deepEqual(
    parseSwatchToCSS(swatch),

    EXPECTED_CSS,
  )
})
