import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, type FieldProps } from "formik";
import { loginSchema } from "../../../validation/AuthValidation";
import style from "./Style.module.css";
import { Checkbox } from "../../../ui/Checkbox/Checkbox";
import { Icons } from "../../../ui/Icons/icons";
import { useState } from "react";

import { login } from "../../../services/Api/auth.ts";
import type { LoginValues } from "../../../types/auth.ts";

import { useAuthStore } from "../../../services/store/authStore.ts";

const initialLoginValues: LoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function LoginForm() {
  const navigate = useNavigate();
  const { fetchUser } = useAuthStore();

  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className={style.block_wrapper}>
      <h1 className={style.title}>Zaloguj się</h1>
      <h2 className={style.sub_title}>
        Witamy! Prosimy o podanie danych uwierzytelniających, aby zalogować się
        do platformy:
      </h2>

      {/* FORM */}

      <Formik
        initialValues={initialLoginValues}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const res = await login(values);

            if (res.status === 200) {
              const data = await fetchUser();

              if (data) {
                navigate("/profile");
              }
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={style.form_wrapper}>
            {/* EMAIL */}
            <div className="input_block">
              <label htmlFor="email" className="label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                className={`${touched.email && errors.email ? "error_border" : ""} input`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="input_error"
              />
            </div>
            {/* PASSWORD */}
            <div className="input_block">
              <label htmlFor="password" className="label">
                Hasło
              </label>
              <Field
                id="password"
                name="password"
                type={viewPassword ? "name" : "password"}
                placeholder="Hasło"
                className={`${touched.password && errors.password ? "error_border" : ""} input`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="input_error"
              />
              <div className={style.view_wrapper}>
                {viewPassword ? (
                  <Icons.notView
                    onClick={() => setViewPassword(!viewPassword)}
                  />
                ) : (
                  <Icons.view onClick={() => setViewPassword(!viewPassword)} />
                )}
              </div>
            </div>
            {/* CHECKBOX */}
            <div className="input_block">
              <Field name="rememberMe">
                {({ field, form }: FieldProps) => (
                  <Checkbox
                    name={field.name}
                    checked={field.value}
                    onChange={(val) => form.setFieldValue(field.name, val)}
                    label="Pozostać w systemie?"
                  />
                )}
              </Field>
            </div>

            <button
              type="submit"
              className="submit_button"
              disabled={isSubmitting}
            >
              Zaloguj się
            </button>
          </Form>
        )}
      </Formik>
      <div className={style.change_link}>
        Nie masz konta?
        <Link to="/zarejestruj-się" className="accent_text">
          Zarejestruj się
        </Link>
      </div>
    </div>
  );
}
