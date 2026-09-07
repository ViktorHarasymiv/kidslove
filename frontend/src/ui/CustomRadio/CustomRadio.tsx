import style from "./Style.module.css";

interface Props {
  checked: boolean;
  onChange: () => void | Promise<void>;
}

export default function CustomRadio({ checked, onChange }: Props) {
  return (
    <div
      className={`${style.radio} ${checked ? style.active : ""}`}
      onClick={onChange}
    >
      <div className={style.circle} />
    </div>
  );
}
