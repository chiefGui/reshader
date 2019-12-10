import test from "ava"

import { hydrateSchemaName } from "."

test("return palette name in lower case", t => {
  const EXPECTED_NAME = "cyan"

  t.is(hydrateSchemaName("Cyan"), EXPECTED_NAME)
})

test("return palette name without spaces", t => {
  const EXPECTED_NAME = "magenta"

  t.is(hydrateSchemaName("  Magenta  "), EXPECTED_NAME)
})

test("return palette name in camel case", t => {
  const EXPECTED_NAME = "dodgerBlue"

  t.is(hydrateSchemaName("Dodger Blue"), EXPECTED_NAME)
})

test("return palette name without weird characters", t => {
  const EXPECTED_NAME = "someColorName"

  t.is(hydrateSchemaName("Some/Color/Name"), EXPECTED_NAME)
})

test("return palette name with numbers", t => {
  const EXPECTED_NAME = "someColorName1"

  t.is(hydrateSchemaName("Some/Color/Name-1"), EXPECTED_NAME)
})
