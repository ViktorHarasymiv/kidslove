import AvatarPicker from "../../../../../../../ui/AvatarPicker/AvatarPicker";
import style from "./Style.module.css";

interface Props {
  onChange: (file: File | null, preview: string | null) => void;
  preview?: string | null;
}

export default function AddPhoto({ onChange, preview }: Props) {
  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      onChange(null, null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={style.photo_wrapper}>
      <AvatarPicker
        onChangePhoto={handlePhotoChange}
        profilePhotoUrl={preview}
      />
    </div>
  );
}
