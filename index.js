const Color = require('color')

const ACCEPTED_OUTPUT_MODELS = ['hex', 'rgb', 'hsl', 'hsv', 'cmyk', 'ansi256']
const DEFAULTS = {
  numberOfVariations: 5,
  contrastRatio: 0.1,
  outputModel: 'hex',
  shouldIgnoreRepeated: false,
  shouldIgnoreWhites: false,
  shouldIgnoreBlacks: false
}

function reshader (
  color,
  {
    numberOfVariations = DEFAULTS.numberOfVariations,
    contrastRatio = DEFAULTS.contrastRatio,
    outputModel = DEFAULTS.outputModel,
    shouldIgnoreRepeated = DEFAULTS.shouldIgnoreRepeated,
    shouldIgnoreWhites = DEFAULTS.shouldIgnoreWhites,
    shouldIgnoreBlacks = DEFAULTS.shouldIgnoreBlacks
  } = {},
  _previousColors = []
) {
  if (!color) {
    throw new Error('You must pass a color.')
  }

  if (typeof color !== 'string') {
    throw new TypeError('The color must be a string.')
  }

  if (contrastRatio < 0 || contrastRatio > 1) {
    throw new RangeError('The contrast ratio must be between 0 and 1.')
  }

  if (
    !ACCEPTED_OUTPUT_MODELS.find(acceptedModel => acceptedModel === outputModel)
  ) {
    throw new Error(
      'The output model must be hex, rgb, hsl, hsv, cmyk or ansi256.'
    )
  }

  const isHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
  const hydratedColor = isHex ? color.toUpperCase() : color
  const currentColors =
    _previousColors.length === 0 ? [hydratedColor] : _previousColors

  const variations = {
    all: currentColors
      .slice(1) // gets from index 1 to ~
      .slice(0, numberOfVariations) // gets from the 'new' 0 to ~
      .reverse()
      .concat(currentColors.slice(1).slice(numberOfVariations)),
    lighter: currentColors
      .slice(1) // gets from index 1 to ~
      .slice(0, numberOfVariations) // gets from the 'new' 0 to ~
      .reverse(),
    darker: currentColors
      .slice(1) // gets from index 1 to ~
      .slice(numberOfVariations)
  }

  const isEnoughOfLighterVariations =
    variations.lighter.length === numberOfVariations
  const shouldGetAnotherColor = variations.all.length < numberOfVariations * 2

  if (shouldGetAnotherColor) {
    if (!isEnoughOfLighterVariations) {
      const newColor = _getLighterShadeOf(hydratedColor, {
        contrastRatio,
        outputModel
      })

      return reshader(
        newColor,
        {
          numberOfVariations,
          contrastRatio,
          outputModel,
          shouldIgnoreRepeated,
          shouldIgnoreWhites,
          shouldIgnoreBlacks
        },
        currentColors.concat(newColor)
      )
    }

    const isFirstDarkerColor = variations.darker.length === 0
    const newColor = _getDarkerShadeOf(
      isFirstDarkerColor ? currentColors[0] : hydratedColor,
      { contrastRatio, outputModel }
    )

    return reshader(
      newColor,
      {
        numberOfVariations,
        contrastRatio,
        outputModel,
        shouldIgnoreRepeated,
        shouldIgnoreWhites,
        shouldIgnoreBlacks
      },
      currentColors.concat(newColor)
    )
  }

  const baseColor = _convertShadeIntoGivenModel(currentColors[0], outputModel)
  const unhydratedPalette = variations.lighter
    .concat(baseColor)
    .concat(variations.darker)
  const palette = _hydrateShades(unhydratedPalette, {
    shouldIgnoreWhites,
    shouldIgnoreBlacks
  })

  return {
    palette: shouldIgnoreRepeated ? _removeRepeatedShades(palette) : palette,
    variations: Object.keys(variations).reduce(
      (accumulatedObjects, currentKey) =>
        Object.assign(accumulatedObjects, {
          [currentKey]: shouldIgnoreRepeated
            ? _removeRepeatedShades(
              _hydrateShades(variations[currentKey], {
                shouldIgnoreWhites,
                shouldIgnoreBlacks
              })
            )
            : _hydrateShades(variations[currentKey], {
              shouldIgnoreWhites,
              shouldIgnoreBlacks
            })
        }),
      0
    )
  }
}

function _getLighterShadeOf (color, { contrastRatio, outputModel }) {
  const outputColor = Color(color).lighten(contrastRatio)

  if (outputModel !== 'hex') {
    return outputColor[outputModel]().string()
  }

  return outputColor.hex()
}

function _getDarkerShadeOf (color, { contrastRatio, outputModel }) {
  const outputColor = Color(color).darken(contrastRatio)

  if (outputModel !== 'hex') {
    return outputColor[outputModel]().string()
  }

  return outputColor.hex()
}

function _convertShadeIntoGivenModel (color, outputModel) {
  return outputModel === 'hex'
    ? Color(color).hex()
    : Color(color)
      [outputModel]()
      .string()
}

function _removeRepeatedShades (colors) {
  return [...new Set(colors)]
}

function _hydrateShades (colors, { shouldIgnoreWhites, shouldIgnoreBlacks }) {
  if (!shouldIgnoreWhites && !shouldIgnoreBlacks) {
    return colors
  }

  return colors.filter(color =>
    _eliminateUnneededShades(color, { shouldIgnoreWhites, shouldIgnoreBlacks })
  )
}

function _eliminateUnneededShades (
  color,
  { shouldIgnoreWhites, shouldIgnoreBlacks }
) {
  const isWhite = Color(color).luminosity() === 1
  const isBlack = Color(color).luminosity() === 0

  if (shouldIgnoreWhites && shouldIgnoreBlacks) {
    return !isWhite && !isBlack
  }

  if (shouldIgnoreWhites) {
    return !isWhite
  }

  if (shouldIgnoreBlacks) {
    return !isBlack
  }

  return color
}

module.exports = reshader
