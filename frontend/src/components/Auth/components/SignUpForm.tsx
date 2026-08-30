import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { registerSchema } from "../../../validation/AuthValidation";
import { Icons } from "../../../ui/Icons/icons";

import { register } from "../../../services/Api/auth.ts";

import style from "./Style.module.css";
import type { RegisterValues } from "../../../types/auth";

const initialRegisterValues: RegisterValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [viewPassword, setViewPassword] = useState(false);
  return (
    <div className={style.block_wrapper}>
      <h1 className={style.title}>Zarejestruj się</h1>
      <h2 className={style.sub_title}>
        Dziękujemy za zainteresowanie naszą platformą.
      </h2>
      {/* FORM */}

      <Formik
        initialValues={initialRegisterValues}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await register(values);

          console.log(res);

          try {
            // await onSubmit(values);  виклик API /auth/login
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={style.form_wrapper}>
            {/* NAME */}

            <div className="input_block">
              <label htmlFor="name" className="label">
                Imię i nazwisko
              </label>
              <Field
                id="name"
                name="name"
                type="name"
                placeholder="Imię i nazwisko"
                className={`${errors.name && touched.name ? "error_border" : ""} input`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="input_error"
              />
            </div>

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
                className={`${errors.email && touched.email ? "error_border" : ""} input`}
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
                className={`${errors.password && touched.password ? "error_border" : ""} input`}
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

            {/* CONFIRM PASSWORD */}

            <div className="input_block">
              <label htmlFor="confirmPassword" className="label">
                Powtórz hasło
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type={viewPassword ? "name" : "password"}
                placeholder="Powtórz hasło"
                className={`${errors.confirmPassword && touched.confirmPassword ? "error_border" : ""} input`}
              />
              <ErrorMessage
                name="confirmPassword"
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

            {/* SUBMIT */}

            <button
              type="submit"
              className="submit_button"
              disabled={isSubmitting}
            >
              Zarejestruj się
            </button>
          </Form>
        )}
      </Formik>
      <div className={style.change_link}>
        Nie masz konta?
        <Link to="/zaloguj-się" className="accent_text">
          Zaloguj się
        </Link>
      </div>
    </div>
  );
}
