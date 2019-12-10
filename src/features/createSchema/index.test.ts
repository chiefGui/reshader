import test from "ava"

import { createShades } from "../createShades"
import { createSchema, ISchema, EXCEPTION__NO_NEUTRAL } from "."
import { EXCEPTION__UNDEFINED_SHADES } from "./index"
import { format } from "src/utils/format"

test("throw exception when argument shades is undefined", t => {
  const exceptionError = t.throws(() => {
    createSchema(({ shades: undefined } as unknown) as ISchema)
  }, Error)

  t.is(exceptionError.message, EXCEPTION__UNDEFINED_SHADES)
})

test("throw exception when argument shades does not have neutral shade", t => {
  const exceptionError = t.throws(() => {
    createSchema(({ shades: { darkest: "#FF00FF" } } as unknown) as ISchema)
  }, Error)

  const objectAsString = `{
  "darkest": "#FF00FF"
}`

  t.is(exceptionError.message, format(EXCEPTION__NO_NEUTRAL, objectAsString))
})

test("return schema with specific formal name", t => {
  const shades = createShades("#67FF71")

  const EXPECTED_SCHEMA: ISchema = {
    formalName: "Screamin' Green",
    hydratedName: "screaminGreen",
    shades,
  }

  const schema = createSchema({ formalName: "Screamin' Green", shades })

  t.deepEqual(schema, EXPECTED_SCHEMA)
})

test("return schema with generated formal name", t => {
  const shades = createShades("#67FF71")

  const EXPECTED_SCHEMA: ISchema = {
    formalName: "Screamin' Green",
    hydratedName: "screaminGreen",
    shades,
  }

  const schema = createSchema({ shades })

  t.deepEqual(schema, EXPECTED_SCHEMA)
})
