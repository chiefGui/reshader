import test from "ava"

import {
  createShades,
  IShades,
  ICreateShadesOptions,
  EXCEPTION__INVALID_COLOR_STRING,
  EXCEPTION__INVALID_CREATE_SHADES_OPTIONS,
} from "."
import { format } from "src/utils"

test("throw exception when color is invalid", t => {
  const exceptionError = t.throws(() => {
    createShades("hello world")
  }, Error)

  t.is(
    exceptionError.message,
    format(EXCEPTION__INVALID_COLOR_STRING, `"hello world"`),
  )
})

test("throw exception when option is invalid", t => {
  const exceptionError = t.throws(() => {
    createShades("#FF00FF", ({
      someRandomProp: true,
    } as unknown) as ICreateShadesOptions)
  }, Error)

  t.is(
    exceptionError.message,
    format(EXCEPTION__INVALID_CREATE_SHADES_OPTIONS, `"someRandomProp"`),
  )
})

test("throw exception when more than one option is invalid", t => {
  const exceptionError = t.throws(() => {
    createShades("#FF00FF", ({
      someRandomProp: true,
      thisIsInvalid: true,
    } as unknown) as ICreateShadesOptions)
  }, Error)

  t.is(
    exceptionError.message,
    format(
      EXCEPTION__INVALID_CREATE_SHADES_OPTIONS,
      `"someRandomProp, thisIsInvalid"`,
    ),
  )
})

test("return shades from #FF00FF color", t => {
  const EXPECTED_SHADES: IShades = {
    darkest: "#820082",
    darker: "#A300A3",
    dark: "#CC00CC",
    neutral: "#FF00FF",
    light: "#FF33FF",
    lighter: "#FF70FF",
    lightest: "#FFB9FF",
  }

  t.deepEqual(createShades("#FF00FF"), EXPECTED_SHADES)
})
