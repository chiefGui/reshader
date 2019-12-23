import test from "ava"

import { hydrateSwatchName } from "."

test("return swatch name in lower case", t => {
  const EXPECTED_NAME = "cyan"

  t.is(hydrateSwatchName("Cyan"), EXPECTED_NAME)
})

test("return swatch name without spaces", t => {
  const EXPECTED_NAME = "magenta"

  t.is(hydrateSwatchName("  Magenta  "), EXPECTED_NAME)
})

test("return swatch name in camel case", t => {
  const EXPECTED_NAME = "dodgerBlue"

  t.is(hydrateSwatchName("Dodger Blue"), EXPECTED_NAME)
})

test("return swatch name without weird characters", t => {
  const EXPECTED_NAME = "someColorNameSomething"

  t.is(hydrateSwatchName("Some/Color/Name'Something"), EXPECTED_NAME)
})

test("return swatch name with numbers", t => {
  const EXPECTED_NAME = "someColorName1"

  t.is(hydrateSwatchName("Some/Color/Name-1"), EXPECTED_NAME)
})
