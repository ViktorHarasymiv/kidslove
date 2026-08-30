import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Nieprawidłowy format adresu e-mail")
    .required("Adres e-mail jest wymagany"),
  password: Yup.string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  rememberMe: Yup.boolean(),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Imię jest za krótkie")
    .required("Imię jest wymagane"),
  email: Yup.string()
    .email("Nieprawidłowy format adresu e-mail")
    .required("Adres e-mail jest wymagany"),
  password: Yup.string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Hasło jest wymagane"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Hasła muszą być takie same")
    .required("Potwierdzenie hasła jest wymagane"),
});
