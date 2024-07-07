export default function validateName(name: string): boolean {
  return /^[a-zA-ZÀ-ÿ]+\s[a-zA-ZÀ-ÿ]+(\s[a-zA-ZÀ-ÿ]+){0,4}$/.test(name);
}
