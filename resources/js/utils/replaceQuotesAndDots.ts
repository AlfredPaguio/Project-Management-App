// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_the_replacement

export function replaceQuotesAndDots(input: string): string {
  return input.replace(/^"|"$|\./g, (match) => (match === "." ? " " : ""));
}
