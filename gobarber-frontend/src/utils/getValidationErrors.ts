import { ValidationError } from 'yup';

interface Errors {
  // Essa key do lado esquerdo so esta falando que pode ser qualquer nome... vc poderia ter usado qualquer coisa no lugar de "key"
  [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
