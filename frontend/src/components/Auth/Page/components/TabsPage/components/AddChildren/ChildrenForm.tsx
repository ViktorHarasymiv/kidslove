import { useState } from "react";
import style from "./Style.module.css";
import Delete_Ico from "../../../../../../../assets/icons/delete.svg";
import Plus_Ico from "../../../../../../../assets/icons/add.svg";
import AddPhoto from "./AddPhoto";
import type { ChildFormValues } from "../../../../../../../types/children";

interface Props {
  badgeId: string | null;
  onSubmit: (formData: FormData) => void;
}

export default function ChildrenForm({ badgeId, onSubmit }: Props) {
  const [form, setForm] = useState<ChildFormValues>({
    name: "",
    age: "",
    allergies: [""],
    medicalNotes: [""],
    emergencyPhone: "",
    avatarUrl: null,
    badgeId,
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [errors, setErrors] = useState<Record<string, string>>({});

  // -----------------------------
  // UPDATE TEXT FIELDS
  // -----------------------------
  const updateField = (field: keyof ChildFormValues, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // -----------------------------
  // UPDATE ARRAY FIELDS
  // -----------------------------
  const updateArrayField = (
    field: "allergies" | "medicalNotes",
    index: number,
    value: string,
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayItem = (field: "allergies" | "medicalNotes") => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (
    field: "allergies" | "medicalNotes",
    index: number,
  ) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  // -----------------------------
  // PHOTO HANDLING
  // -----------------------------
  const handlePhotoChange = (file: File | null, preview: string | null) => {
    setAvatarFile(file);
    updateField("avatarUrl", preview);
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("age", String(form.age));
    fd.append("emergencyPhone", form.emergencyPhone);
    fd.append("badgeId", form.badgeId || "");

    form.allergies.forEach((a, i) => fd.append(`allergies[${i}]`, a));
    form.medicalNotes.forEach((m, i) => fd.append(`medicalNotes[${i}]`, m));

    if (avatarFile) {
      fd.append("avatar", avatarFile);
    }

    for (const [key, value] of fd.entries()) {
      console.log(key, value);
    }

    onSubmit(fd);
  };

  return (
    <div className={style.wrapper}>
      <form className={style.form_block} onSubmit={handleSubmit}>
        <div className={style.form_wrapper}>
          <div className={style.first_column}>
            <h2>Informacje ogólne</h2>

            {/* NAME */}
            <div className="input_block">
              <label className="label">Imię *</label>
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="input"
                placeholder="Wpisz imię dziecka"
              />
            </div>

            {/* AGE */}
            <div className="input_block">
              <label className="label">Wiek *</label>
              <input
                value={form.age}
                onChange={(e) => updateField("age", e.target.value)}
                className="input"
                placeholder="Wpisz wiek dziecka"
              />
            </div>

            <h2>Połączenie</h2>

            {/* PHONE */}
            <div className="input_block">
              <label className="label">Numer kontaktowy *</label>
              <input
                value={form.emergencyPhone}
                onChange={(e) => updateField("emergencyPhone", e.target.value)}
                className="input"
                placeholder="+48 123 456 789"
              />
            </div>

            {/* ALLERGIES */}
            <div className={style.block_title}>
              <h2>Informacje medyczne</h2>
              <button
                type="button"
                className={style.add_btn}
                onClick={() => addArrayItem("allergies")}
              >
                <img src={Plus_Ico} alt="Add field" />
              </button>
            </div>

            <div className="input_block">
              <label className="label">Alergie</label>

              <div className={style.dynamic_list}>
                {form.allergies.map((item, index) => (
                  <div key={index} className={style.dynamic_item}>
                    <input
                      value={item}
                      onChange={(e) =>
                        updateArrayField("allergies", index, e.target.value)
                      }
                      className="input"
                      placeholder="Wpisz alergię"
                    />

                    <button
                      type="button"
                      className={style.remove_btn}
                      onClick={() => removeArrayItem("allergies", index)}
                    >
                      <img src={Delete_Ico} alt="Remove allergies" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTES */}

            <div className={style.block_title}>
              <h2>Inne notatki</h2>

              <button
                type="button"
                className={style.add_btn}
                onClick={() => addArrayItem("medicalNotes")}
              >
                <img src={Plus_Ico} alt="Add field" />
              </button>
            </div>

            <div className="input_block">
              <label className="label">Notatki</label>

              <div className={style.dynamic_list}>
                {form.medicalNotes.map((item, index) => (
                  <div key={index} className={style.dynamic_item}>
                    <input
                      value={item}
                      onChange={(e) =>
                        updateArrayField("medicalNotes", index, e.target.value)
                      }
                      className="input"
                      placeholder="Opisz cechę medyczną"
                    />

                    <button
                      type="button"
                      className={style.remove_btn}
                      onClick={() => removeArrayItem("medicalNotes", index)}
                    >
                      <img src={Delete_Ico} alt="Remove note" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* PHOTO PICKER */}

          <div className="input_block">
            <AddPhoto onChange={handlePhotoChange} preview={form.avatarUrl} />
          </div>
        </div>

        {/* SUBMIT */}
        <button type="submit" className="button_link">
          Dodaj dziecko
        </button>
      </form>
    </div>
  );
}
