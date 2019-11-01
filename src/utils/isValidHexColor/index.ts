/**
 * isValidHexColor checks whether a given color string matches
 * a hexadecimal string.
 *
 * @param maybeHexColor the string to check
 */
export function isValidHexColor(maybeHexColor: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(maybeHexColor)
}
