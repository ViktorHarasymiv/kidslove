import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import style from "./Style.module.css";

import Avatar from "../../../../../assets/icons/avatar.svg";
import Edit from "../../../../../assets/icons/edit.svg";
import User from "../../../../../assets/icons/user.svg";
import { loginSchema } from "../../../../../validation/AuthValidation";
import type { LoginValues } from "../../../../../types/auth";
import { login } from "../../../../../services/Api/auth";

import { useAuthStore } from "../../../../../services/store/authStore";

export default function UserTile() {
  const { user, fetchUser } = useAuthStore();

  const [editMode, setEditMode] = useState(false);

  if (!user) return;

  const initialLoginValues: LoginValues = {
    email: user.email,
    password: "",
    rememberMe: false,
  };

  return (
    <div className={style.user_wrapper}>
      <div className={style.user_action_wrapper}>
        <div>
          <img
            src={User}
            width={80}
            height={38}
            alt="Set form block"
            className={style.set_block}
          />
        </div>
        <img
          src={Edit}
          width={38}
          height={38}
          alt="Edit my page"
          className={style.edit_action}
          onClick={() => setEditMode(!editMode)}
        />
      </div>
      <div className={style.form_wrapper}>
        <div className={style.avatar_block}>
          <img src={Avatar} width={110} height={110} alt="My photo fallback" />
          <div className={style.custom_upload_wrapper}>
            <input
              type="file"
              placeholder="Upload photo"
              className={style.custom_upload}
            />
            <span className={style.custom_upload_text}>Dodaj zdjęcie</span>
          </div>
        </div>
        <div className={style.form_block}>
          <h2 className={style.block_title}>My information</h2>

          {/* FORM */}

          <Formik
            initialValues={initialLoginValues}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await login(values);

                if (res.status === 200) {
                  const data = await fetchUser();
                  console.log(data);
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, errors }) => (
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
                    disabled={!editMode}
                    className={`${errors.email ? "error_border" : ""} input`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="input_error"
                  />
                </div>

                {editMode && (
                  <button
                    type="submit"
                    className="submit_button"
                    disabled={isSubmitting}
                  >
                    Zaloguj się
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
