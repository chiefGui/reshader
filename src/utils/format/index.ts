export function format(content: string, tokenValue: string): string {
  return content.replace(/%s/, tokenValue)
}
