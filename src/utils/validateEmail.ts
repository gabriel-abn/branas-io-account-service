export default function validateEmail(email: string): boolean {
  return /^(.+)@(.+)$/.test(email);
}
