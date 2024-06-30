export default function validateCarPlate(carPlate: string): boolean {
  return /[A-Z]{3}[0-9]{4}/.test(carPlate);
}
