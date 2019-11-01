import test from "ava"

import { isValidHexColor } from "."

test("return false when string is not a valid color hexadecimal", t => {
  t.is(isValidHexColor("hello"), false)
  t.is(isValidHexColor("#ffff"), false)
  t.is(isValidHexColor("123123"), false)
})

test("return true when string is a valid, short color hexadecimal", t => {
  t.is(isValidHexColor("#fff"), true)
  t.is(isValidHexColor("#Fff"), true)
  t.is(isValidHexColor("#FFF"), true)
  t.is(isValidHexColor("#FFFFFF"), true)
})
