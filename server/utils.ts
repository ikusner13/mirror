// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function html(strings: TemplateStringsArray, ...values: any[]): string {
  return strings
    .reduce((result, str, i) => result + str + (values[i] || ""), "")
    .trim()
    .replace(/\n\s+/g, " "); // Removes new lines and excessive whitespace
}
