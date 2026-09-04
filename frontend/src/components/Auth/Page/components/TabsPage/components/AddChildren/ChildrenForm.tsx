import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import style from "./Style.module.css";
import type { ChildFormValues } from "../../../../../../../types/children";

import Delete_Ico from "../../../../../../../assets/icons/delete.svg";
import Plus_Ico from "../../../../../../../assets/icons/add.svg";

interface Props {
  badgeId: string | null;
  onSubmit: (values: ChildFormValues) => void;
}

export default function ChildrenForm({ badgeId, onSubmit }: Props) {
  const initialValues: ChildFormValues = {
    name: "",
    age: "",
    allergies: [""],
    medicalNotes: [""],
    emergencyPhone: "",
    avatarUrl: null,
    badgeId: badgeId,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Imię jest wymagane"),

    age: Yup.number()
      .typeError("Wiek musi być liczbą")
      .min(1, "Minimalny wiek to 1 rok")
      .max(18, "Maksymalny wiek to 18 lat")
      .required("Wiek jest wymagany"),

    emergencyPhone: Yup.string()
      .matches(
        /^(\+?48)?[ ]?(\(?48\)?[ ]?)?(\d{3}[ -]?\d{3}[ -]?\d{3})$/,
        "Nieprawidłowy format numeru telefonu",
      )
      .required("Numer telefonu jest wymagany"),

    allergies: Yup.array()
      .of(
        Yup.string()
          .min(2, "Minimalna długość to 2 znaki")
          .max(50, "Maksymalna długość to 50 znaków")
          .required("Pole nie może być puste"),
      )
      .max(20, "Zbyt wiele alergii"),

    medicalNotes: Yup.array()
      .of(
        Yup.string()
          .min(3, "Minimalna długość to 3 znaki")
          .max(200, "Maksymalna długość to 200 znaków")
          .required("Pole nie może być puste"),
      )
      .max(20, "Zbyt wiele notatek medycznych"),

    avatarUrl: Yup.string().nullable(),

    badgeId: Yup.string(),
  });

  return (
    <Formik<ChildFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        errors,
        touched,
      }) => {
        return (
          <Form>
            <div className={style.form_block}>
              <div className={style.form_wrapper}>
                {/*  */}
                <h2>Informacje ogólne</h2>
                {/* NAME */}
                <div className="input_block">
                  <label className="label">Imię *</label>
                  <Field
                    name="name"
                    onBlur={() => setFieldTouched("name", true)}
                    className={`${errors.name && touched.name ? "error_border" : ""} input`}
                    placeholder="Wpisz imię dziecka"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="input_error"
                  />
                </div>

                {/* AGE */}
                <div className="input_block">
                  <label className="label">Wiek *</label>
                  <Field
                    name="age"
                    onBlur={() => setFieldTouched("age", true)}
                    className={`${errors.age && touched.age ? "error_border" : ""} input`}
                    placeholder="Wpisz wiek dziecka"
                  />
                  <ErrorMessage
                    name="age"
                    component="span"
                    className="input_error"
                  />
                </div>
                {/*  */}
                <h2>Połączenie</h2>
                {/* PHONE */}
                <div className="input_block">
                  <label className="label">Numer kontaktowy *</label>
                  <Field
                    name="emergencyPhone"
                    onBlur={() => setFieldTouched("emergencyPhone", true)}
                    className={`${errors.emergencyPhone && touched.emergencyPhone ? "error_border" : ""} input`}
                    placeholder="+48 123 456 789"
                  />
                  <ErrorMessage
                    name="emergencyPhone"
                    component="span"
                    className="input_error"
                  />
                </div>
                {/*  */}
                <h2>Informacje medyczne</h2>
                {/* ALLERGIES */}
                <FieldArray name="allergies">
                  {({ push, remove }) => (
                    <div className="input_block">
                      <label className="label">Alergie</label>

                      <div className={style.dynamic_list}>
                        {values.allergies.map((_, index) => (
                          <div key={index} className={style.dynamic_item}>
                            <Field
                              name={`allergies.${index}`}
                              onBlur={() =>
                                setFieldTouched(`allergies.${index}`, true)
                              }
                              className={`${
                                errors.allergies?.[index] &&
                                Array.isArray(touched.allergies) &&
                                touched.allergies[index]
                                  ? "error_border"
                                  : ""
                              } input`}
                              placeholder="Wpisz informacje o alergiach lub innych dolegliwościach"
                            />

                            <ErrorMessage
                              name={`allergies.${index}`}
                              component="span"
                              className="input_error"
                            />

                            <button
                              type="button"
                              className={style.remove_btn}
                              onClick={() => remove(index)}
                            >
                              <img src={Delete_Ico} alt="Remove allergies" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className={style.add_btn}
                          onClick={() => push("")}
                        >
                          <img src={Plus_Ico} alt="Add field" />
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
                {/*  */}
                <h2>Inne notatki</h2>
                {/* NOTES */}
                <FieldArray name="medicalNotes">
                  {({ push, remove }) => (
                    <div className="input_block">
                      <label className="label">Notatki</label>

                      <div className={style.dynamic_list}>
                        {values.medicalNotes.map((_, index) => (
                          <div key={index} className={style.dynamic_item}>
                            <Field
                              name={`medicalNotes.${index}`}
                              as="textarea"
                              onBlur={() =>
                                setFieldTouched(`medicalNotes.${index}`, true)
                              }
                              className={`${
                                errors.medicalNotes?.[index] &&
                                Array.isArray(touched.medicalNotes) &&
                                touched.medicalNotes[index]
                                  ? "error_border"
                                  : ""
                              } input`}
                              placeholder="Opisz cechę medyczną"
                            />

                            <ErrorMessage
                              name={`medicalNotes.${index}`}
                              component="span"
                              className="input_error"
                            />

                            <button
                              type="button"
                              className={style.remove_btn}
                              onClick={() => remove(index)}
                            >
                              <img src={Delete_Ico} alt="Remove note" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          className={style.add_btn}
                          onClick={() => push("")}
                        >
                          <img src={Plus_Ico} alt="Add field" />
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* PHOTO */}

              <div className={style.input_block}>
                <label className={style.input_label}>Фото дитини</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFieldValue("avatarUrl", url);
                    }
                  }}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`button_link ${isSubmitting ? "disabled_button" : ""}`}
            >
              {isSubmitting ? "Dodawanie..." : "Dodaj dziecko"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
