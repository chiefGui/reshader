import ntc from "ntcjs"

import { IShades } from "../createShades"
import { hydrateSwatchName } from "./hydrateSwatchName"
import { format } from "src/utils/format"

export function createSwatch({
  formalName,
  shades,
  contrastRatio,
}: TCreateSwatch): ISwatch {
  if (!shades) {
    throw new Error(EXCEPTION__UNDEFINED_SHADES)
  }

  if (!shades.neutral) {
    throw new Error(
      format(EXCEPTION__NO_NEUTRAL, JSON.stringify(shades, null, 2)),
    )
  }

  const actualFormalName = formalName || ntc.name(shades.neutral)[1]
  const hydratedName = hydrateSwatchName(actualFormalName)

  return {
    formalName: actualFormalName,
    hydratedName,
    contrastRatio: contrastRatio || 0.2,
    shades,
  }
}

export interface ISwatch {
  formalName: string
  hydratedName: string
  shades: IShades
  contrastRatio: number
}

type TCreateSwatch = Pick<ISwatch, "shades"> & {
  formalName?: string
  contrastRatio?: number
}

export const EXCEPTION__UNDEFINED_SHADES = `"createSwatch" requires at least the argument "shades"`
export const EXCEPTION__NO_NEUTRAL = `You are trying to run "createSwatch" without passing the "neutral" shade
through the "shades" property. What we actually got is this: ("%s").
Please, make sure the shade "neutral" is present and is a valid hex code.`
