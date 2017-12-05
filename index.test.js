import test from 'ava'
import reshader from './index'
import intersection from 'lodash/fp/intersection'
import Color from 'color'

import hasRepeated from './testUtils/hasRepeated'

const WHITE = '#FFFFFF'
const RED = '#FF0000'
const BLACK = '#000000'
const DARK_GRAY = '#222222'

test('throws an Error whether a color is not passed', t => {
  const error = t.throws(() => reshader(), Error)

  t.is(error.message, 'You must pass a color.')
})

test('throws a TypeError whether the passed color is not a string', t => {
  const error = t.throws(() => reshader(1), TypeError)

  t.is(error.message, 'The color must be a string.')
})

test('throws a RangeError whether the passed range is lower than 0 or greater than 1', t => {
  const lowerError = t.throws(() => reshader(RED, { contrastRatio: -1 }))
  const greaterError = t.throws(() => reshader(RED, { contrastRatio: 2 }))

  t.is(lowerError.message, 'The contrast ratio must be between 0 and 1.')
  t.is(greaterError.message, 'The contrast ratio must be between 0 and 1.')
})

test('throws an Error whether the passed model is not one of the accepted ones', t => {
  const error = t.throws(() => reshader(RED, { outputModel: 'x' }))

  t.is(
    error.message,
    'The output model must be hex, rgb, hsl, hsv, cmyk or ansi256.'
  )
})

test('returns 5 lighter colors from a random color', t => {
  const { variations } = reshader(RED)

  t.is(variations.lighter.length, 5)
})

test('returns 5 darker colors from a random color', t => {
  const { variations } = reshader(RED)

  t.is(variations.darker.length, 5)
})

test('returns 11 colors, 5 lighter, 5 darker, and the base', t => {
  const { palette } = reshader(RED)

  t.is(palette.length, 11)
})

test('returns 10 variations', t => {
  const { variations } = reshader(RED)

  t.is(variations.all.length, 10)
})

test('returns the variations without the base', t => {
  const { variations } = reshader(RED)
  const isBaseAmongVariations =
    variations.all.filter(color => color === RED).length > 0

  t.false(isBaseAmongVariations)
})

test('returns the palette with variations and the base color', t => {
  const { palette, variations } = reshader(RED)
  const isBaseInPalette = palette.filter(color => color === RED).length > 0
  const doesPaletteHaveAllVariations =
    intersection(variations.all)(palette).length === 10

  t.true(isBaseInPalette)
  t.true(doesPaletteHaveAllVariations)
})

test('returns the palette with all the lighter colors', t => {
  const { palette, variations } = reshader(RED)
  const areLighterColorsInPalette =
    intersection(variations.lighter)(palette).length === 5

  t.true(areLighterColorsInPalette)
})

test('returns the palette with all the darker colors', t => {
  const { palette, variations } = reshader(RED)
  const areDarkerColorsInPalette =
    intersection(variations.darker)(palette).length === 5

  t.true(areDarkerColorsInPalette)
})

test('returns the variations with all the lighter colors', t => {
  const { variations } = reshader(RED)
  const areLighterColorsInVariations =
    intersection(variations.lighter)(variations.all).length === 5

  t.true(areLighterColorsInVariations)
})

test('returns the variations with all the darker colors', t => {
  const { variations } = reshader(RED)
  const areDarkerColorsInVariations =
    intersection(variations.darker)(variations.all).length === 5

  t.true(areDarkerColorsInVariations)
})

test('returns the same lighter colors for white', t => {
  const { variations } = reshader(WHITE)
  const areAllColorsWhite =
    variations.lighter.filter(color => color === WHITE).length === 5

  t.true(areAllColorsWhite)
})

test('returns the same darker colors for black', t => {
  const { variations } = reshader(BLACK)
  const areAllColorsBlack =
    variations.darker.filter(color => color === BLACK).length === 5

  t.true(areAllColorsBlack)
})

test('returns the correct lighter colors from given red, from lighter to darker', t => {
  const { variations } = reshader(RED)

  const CONTRAST_RATIO = 0.1

  const firstLighterTone = Color(RED)
    .lighten(CONTRAST_RATIO)
    .hex()
  const secondLighterTone = Color(firstLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const thirdLighterTone = Color(secondLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const fourthLighterTone = Color(thirdLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const fifthLighterTone = Color(fourthLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()

  t.is(variations.lighter[0], fifthLighterTone)
  t.is(variations.lighter[1], fourthLighterTone)
  t.is(variations.lighter[2], thirdLighterTone)
  t.is(variations.lighter[3], secondLighterTone)
  t.is(variations.lighter[4], firstLighterTone)
})

test('returns the correct darker colors from given red, from lighter to darker', t => {
  const { variations } = reshader(RED)

  const CONTRAST_RATIO = 0.1

  const firstDarkerTone = Color(RED)
    .darken(CONTRAST_RATIO)
    .hex()
  const secondDarkerTone = Color(firstDarkerTone)
    .darken(CONTRAST_RATIO)
    .hex()
  const thirdDarkerTone = Color(secondDarkerTone)
    .darken(CONTRAST_RATIO)
    .hex()
  const fourthDarkerTone = Color(thirdDarkerTone)
    .darken(CONTRAST_RATIO)
    .hex()
  const fifthDarkerTone = Color(fourthDarkerTone)
    .darken(CONTRAST_RATIO)
    .hex()

  t.is(variations.darker[0], firstDarkerTone)
  t.is(variations.darker[1], secondDarkerTone)
  t.is(variations.darker[2], thirdDarkerTone)
  t.is(variations.darker[3], fourthDarkerTone)
  t.is(variations.darker[4], fifthDarkerTone)
})

test('returns the correct lighter colors from given red, from lighter to darker, with a custom contrast', t => {
  const CONTRAST_RATIO = 0.2

  const { variations } = reshader(RED, { contrastRatio: CONTRAST_RATIO })

  const firstLighterTone = Color(RED)
    .lighten(CONTRAST_RATIO)
    .hex()
  const secondLighterTone = Color(firstLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const thirdLighterTone = Color(secondLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const fourthLighterTone = Color(thirdLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()
  const fifthLighterTone = Color(fourthLighterTone)
    .lighten(CONTRAST_RATIO)
    .hex()

  t.is(variations.lighter[0], fifthLighterTone)
  t.is(variations.lighter[1], fourthLighterTone)
  t.is(variations.lighter[2], thirdLighterTone)
  t.is(variations.lighter[3], secondLighterTone)
  t.is(variations.lighter[4], firstLighterTone)
})

test('returns the correct darker colors from given red, from lighter to darker, with a custom contrast', t => {
  const CONTRAST = 0.2

  const { variations } = reshader(RED, { contrastRatio: CONTRAST })

  const firstDarkerTone = Color(RED)
    .darken(CONTRAST)
    .hex()
  const secondDarkerTone = Color(firstDarkerTone)
    .darken(CONTRAST)
    .hex()
  const thirdDarkerTone = Color(secondDarkerTone)
    .darken(CONTRAST)
    .hex()
  const fourthDarkerTone = Color(thirdDarkerTone)
    .darken(CONTRAST)
    .hex()
  const fifthDarkerTone = Color(fourthDarkerTone)
    .darken(CONTRAST)
    .hex()

  t.is(variations.darker[0], firstDarkerTone)
  t.is(variations.darker[1], secondDarkerTone)
  t.is(variations.darker[2], thirdDarkerTone)
  t.is(variations.darker[3], fourthDarkerTone)
  t.is(variations.darker[4], fifthDarkerTone)
})

test('returns a custom, given number of variations', t => {
  const { palette, variations } = reshader(RED, {
    numberOfVariations: 2
  })

  t.is(palette.length, 5)
  t.is(variations.all.length, 4)
  t.is(variations.lighter.length, 2)
  t.is(variations.darker.length, 2)
})

test('returns rgb color model', t => {
  const { palette, variations } = reshader(WHITE, {
    outputModel: 'rgb'
  })

  const lighterWhiteInRGB = Color(WHITE)
    .lighten(0.1)
    .rgb()
    .string()
  const darkerWhiteInRGB = Color(WHITE)
    .darken(0.1)
    .rgb()
    .string()

  t.is(palette[0], lighterWhiteInRGB)
  t.is(variations.all[0], lighterWhiteInRGB)
  t.is(variations.lighter[0], lighterWhiteInRGB)
  t.is(variations.darker[0], darkerWhiteInRGB)
})

test('returns hsl color model', t => {
  const { palette, variations } = reshader(WHITE, {
    outputModel: 'hsl'
  })

  const lighterWhiteInHSL = Color(WHITE)
    .lighten(0.1)
    .hsl()
    .string()
  const darkerWhiteInHSL = Color(WHITE)
    .darken(0.1)
    .hsl()
    .string()

  t.is(palette[0], lighterWhiteInHSL)
  t.is(variations.all[0], lighterWhiteInHSL)
  t.is(variations.lighter[0], lighterWhiteInHSL)
  t.is(variations.darker[0], darkerWhiteInHSL)
})

test('returns hsv color model', t => {
  const { palette, variations } = reshader(WHITE, {
    outputModel: 'hsv'
  })

  const lighterWhiteInHSV = Color(WHITE)
    .lighten(0.1)
    .hsv()
    .string()
  const darkerWhiteInHSV = Color(WHITE)
    .darken(0.1)
    .hsv()
    .string()

  t.is(palette[0], lighterWhiteInHSV)
  t.is(variations.all[0], lighterWhiteInHSV)
  t.is(variations.lighter[0], lighterWhiteInHSV)
  t.is(variations.darker[0], darkerWhiteInHSV)
})

test('returns cmyk color model', t => {
  const { palette, variations } = reshader(WHITE, {
    outputModel: 'cmyk'
  })

  const lighterWhiteInCMYK = Color(WHITE)
    .lighten(0.1)
    .cmyk()
    .string()
  const darkerWhiteInCMYK = Color(WHITE)
    .darken(0.1)
    .cmyk()
    .string()

  t.is(palette[0], lighterWhiteInCMYK)
  t.is(variations.all[0], lighterWhiteInCMYK)
  t.is(variations.lighter[0], lighterWhiteInCMYK)
  t.is(variations.darker[0], darkerWhiteInCMYK)
})

test('returns ansi256 color model', t => {
  const { palette, variations } = reshader(WHITE, {
    outputModel: 'ansi256'
  })

  const lighterWhiteInANSI256 = Color(WHITE)
    .lighten(0.1)
    .ansi256()
    .string()
  const darkerWhiteInANSI256 = Color(WHITE)
    .darken(0.1)
    .ansi256()
    .string()

  t.is(palette[0], lighterWhiteInANSI256)
  t.is(variations.all[0], lighterWhiteInANSI256)
  t.is(variations.lighter[0], lighterWhiteInANSI256)
  t.is(variations.darker[0], darkerWhiteInANSI256)
})

test('returns palette without repeated whites', t => {
  const { palette } = reshader(WHITE, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_COLORS = 6

  t.is(palette.length, EXPECTED_NUMBER_OF_COLORS)
  t.is(palette[0], WHITE)
  t.is(
    palette[1],
    Color(WHITE)
      .darken(0.1)
      .hex()
  )
  t.is(hasRepeated(palette), false)
})

test('returns all variations without repeated whites', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_VARIATIONS = 6

  t.is(variations.all.length, EXPECTED_NUMBER_OF_VARIATIONS)
  t.is(variations.all[0], WHITE)
  t.is(
    variations.all[1],
    Color(WHITE)
      .darken(0.1)
      .hex()
  )
  t.is(hasRepeated(variations.all), false)
})

test('returns lighter variations without repeated entries', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_VARIATIONS = 1

  t.is(variations.lighter.length, EXPECTED_NUMBER_OF_VARIATIONS)
  t.is(variations.lighter[0], WHITE)
  t.is(hasRepeated(variations.lighter), false)
})

test('returns darker variations without repeated entries', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_VARIATIONS = 5

  t.is(variations.darker.length, EXPECTED_NUMBER_OF_VARIATIONS)
  t.is(
    variations.darker[0],
    Color(WHITE)
      .darken(0.1)
      .hex()
  )
  t.is(hasRepeated(variations.darker), false)
})

test('returns palette with only 1 black color', t => {
  const { palette } = reshader(BLACK, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_COLORS = 1

  t.is(palette.length, EXPECTED_NUMBER_OF_COLORS)
  t.is(palette[0], BLACK)
})

test('returns 1 variation for darken and lighter when all colors are the same', t => {
  const { variations } = reshader(BLACK, { shouldIgnoreRepeated: true })

  const EXPECTED_NUMBER_OF_VARIATIONS = 1

  t.is(variations.all.length, EXPECTED_NUMBER_OF_VARIATIONS)
  t.is(variations.lighter.length, EXPECTED_NUMBER_OF_VARIATIONS)
  t.is(variations.darker.length, EXPECTED_NUMBER_OF_VARIATIONS)

  t.is(variations.all[0], BLACK)
  t.is(variations.lighter[0], BLACK)
  t.is(variations.darker[0], BLACK)
})

test('returns palette without whites when ignoring whites', t => {
  const { palette } = reshader(WHITE, { shouldIgnoreWhites: true })
  const EXPECTED_PALETTE_LENGTH = 5 // 5 darker shades and nothing else

  t.is(palette.length, EXPECTED_PALETTE_LENGTH)
  t.false(palette.includes(WHITE))
})

test('returns variations.all without whites when ignoring whites', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreWhites: true })
  const EXPECTED_ALL_VARIATIONS_LENGTH = 5 // only darker shades

  t.is(variations.all.length, EXPECTED_ALL_VARIATIONS_LENGTH)
  t.false(variations.all.includes(WHITE))
})

test('returns variations.lighter with no elements when ignoring whites', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreWhites: true })
  const EXPECTED_LIGHTER_VARIATIONS_LENGTH = 0

  t.is(variations.lighter.length, EXPECTED_LIGHTER_VARIATIONS_LENGTH)
})

test('returns variations.darker with 5 elements when ignoring whites', t => {
  const { variations } = reshader(WHITE, { shouldIgnoreWhites: true })
  const EXPECTED_DARKER_VARIATIONS_LENGTH = 5

  t.is(variations.darker.length, EXPECTED_DARKER_VARIATIONS_LENGTH)
})

test('returns palette without blacks when ignoring blacks', t => {
  const { palette } = reshader(DARK_GRAY, {
    shouldIgnoreBlacks: true,
    contrastRatio: 1
  })

  const EXPECTED_PALETTE_LENGTH = 6 // lighter shades (5) + base color (1)

  t.is(palette.length, EXPECTED_PALETTE_LENGTH)
  t.false(palette.includes(BLACK))
})

test('returns variations.all without blacks when ignoring blacks', t => {
  const { variations } = reshader(DARK_GRAY, {
    shouldIgnoreBlacks: true,
    contrastRatio: 1
  })

  const EXPECTED_ALL_VARIATIONS_LENGTH = 5 // lighter shades (5) - base color (1)

  t.is(variations.all.length, EXPECTED_ALL_VARIATIONS_LENGTH)
  t.false(variations.all.includes(BLACK))
})

test('returns variations.lighter with 5 elements when ignoring blacks', t => {
  const { variations } = reshader(DARK_GRAY, {
    shouldIgnoreBlacks: true,
    contrastRatio: 1
  })

  const EXPECTED_LIGHTER_VARIATIONS_LENGTH = 5

  t.is(variations.lighter.length, EXPECTED_LIGHTER_VARIATIONS_LENGTH)
  t.false(variations.lighter.includes(BLACK))
})

test('returns variations.darker with no elements when ignoring blacks', t => {
  const { variations } = reshader(DARK_GRAY, {
    shouldIgnoreBlacks: true,
    contrastRatio: 1
  })

  // the lightest darker shade of DARK_GRAY on contrastRatio 1 is blakc, meaning this value is zero.
  const EXPECTED_DARKER_VARIATIONS_LENGTH = 0

  t.is(variations.darker.length, EXPECTED_DARKER_VARIATIONS_LENGTH)
})

test('returns palette and variations without whites and blacks when ignoring both', t => {
  const { palette, variations } = reshader(RED, {
    shouldIgnoreWhites: true,
    shouldIgnoreBlacks: true,
    contrastRatio: 1
  })

  const EXPECTED_PALETTE_LENGTH = 1
  const EXPECTED_ALL_VARIATIONS_LENGTH = 0
  const EXPECTED_LIGHTER_VARIATIONS_LENGTH = 0
  const EXPECTED_DARKER_VARIATIONS_LENGTH = 0

  t.is(palette.length, EXPECTED_PALETTE_LENGTH)
  t.is(variations.all.length, EXPECTED_ALL_VARIATIONS_LENGTH)
  t.is(variations.lighter.length, EXPECTED_LIGHTER_VARIATIONS_LENGTH)
  t.is(variations.darker.length, EXPECTED_DARKER_VARIATIONS_LENGTH)
})
