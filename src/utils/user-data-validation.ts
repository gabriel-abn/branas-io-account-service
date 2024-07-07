export function validateName(name: string): boolean {
  return /^[a-zA-ZÀ-ÿ'-]+\s[a-zA-ZÀ-ÿ'-]+(\s[a-zA-ZÀ-ÿ'-]+){0,4}$/.test(name);
}

export function validateCarPlate(carPlate: string): boolean {
  return /[A-Z]{3}[0-9]{4}/.test(carPlate);
}

export function validateCpf(rawCpf: string) {
  const CPF_LENGTH = 11;
  const FACTOR_FIRST_DIGIT = 10;
  const FACTOR_SECOND_DIGIT = 11;

  if (!rawCpf) return false;
  const cpf = removeNonDigits(rawCpf);
  if (cpf.length !== CPF_LENGTH) return false;
  if (allDigitsTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, FACTOR_FIRST_DIGIT);
  const digit2 = calculateDigit(cpf, FACTOR_SECOND_DIGIT);
  return extractActualDigit(cpf) === `${digit1}${digit2}`;

  function removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  function allDigitsTheSame(cpf: string) {
    const [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  function calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  function extractActualDigit(cpf: string) {
    return cpf.slice(9);
  }
}

export function validateEmail(email: string): boolean {
  return /^(.+)@(.+)$/.test(email);
}
