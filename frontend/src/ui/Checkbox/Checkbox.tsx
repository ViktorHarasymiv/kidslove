import React from "react";
import styles from "./Style.module.css";

type CheckboxProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  name,
}) => {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.input}
      />

      <span className={styles.custom} />

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
