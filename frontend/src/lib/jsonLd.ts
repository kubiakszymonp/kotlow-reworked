/**
 * Serialize a JSON-LD object for embedding in a <script> tag. JSON.stringify
 * does NOT escape `<`, so a CMS value containing `</script>` (or `<!--`) would
 * break out of the script element — a stored-XSS vector. Escaping `<` to the
 * unicode form keeps the JSON valid while making break-out impossible.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
