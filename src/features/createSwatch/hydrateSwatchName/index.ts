export function hydrateSwatchName(dirtySwatchName: string): string {
  const trimmed = dirtySwatchName.trim()
  const camelized = camelize(trimmed)
  const validCharactersOnly = removeWeirdCharacters(camelized)

  return validCharactersOnly
}

function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

function removeWeirdCharacters(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, "").replace(/['"]+/g, "")
}
