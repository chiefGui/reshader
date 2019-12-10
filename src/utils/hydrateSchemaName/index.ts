export function hydrateSchemaName(dirtyPaletteName: string): string {
  const trimmed = dirtyPaletteName.trim()
  const camelized = camelize(trimmed)

  return camelized
}

function camelize(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
}
