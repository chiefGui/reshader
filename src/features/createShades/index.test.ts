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
    darkest: "#580057",
    darker: "#7D007D",
    dark: "#B300B2",
    neutral: "#FF00FF",
    light: "#FF4DFF",
    lighter: "#FFB1FF",
    lightest: "#FFFFFF",
  }

  t.deepEqual(createShades("#FF00FF"), EXPECTED_SHADES)
})
