import { useState, type ChangeEvent } from "react";
import style from "./Style.module.css";

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string | null;
};

const AvatarPicker = ({ onChangePhoto, profilePhotoUrl }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profilePhotoUrl ?? null,
  );
  const [error, setError] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError("");

    if (file) {
      // Перевіримо тип файлу
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      // Перевіримо розмір файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      onChangePhoto(file); // передаємо файл у батьківський компонент

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <div className={style.picker}>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={style.avatar}
          />
        )}

        <label
          className={
            previewUrl ? `${style.wrapper} ${style.reload}` : style.wrapper
          }
        >
          📷 Choose photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={style.input}
          />
        </label>

        {previewUrl && (
          <button className={style.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>

      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
