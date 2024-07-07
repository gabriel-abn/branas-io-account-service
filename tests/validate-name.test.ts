import validateName from "src/utils/validateName";

it.each(["João", "Maria", "José"])(
  "Deve retornar erro se apenas o primeiro nome for informado: %s",
  (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  },
);

it.each(["Gabriel Nascimento 123", "João Silva 123"])(
  "Deve retornar erro se nome conter números: %s",
  (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(false);
  },
);

it.each(["João Silva", "Maria Silva", "José Silva"])(
  "Deve retornar verdadeiro se nome completo for informado: %s",
  (name: string) => {
    const isValid = validateName(name);
    expect(isValid).toBe(true);
  },
);
