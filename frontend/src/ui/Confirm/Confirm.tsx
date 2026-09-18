// components/modals/Confirm.tsx

import { useModalStore } from "../../store/modalStore";

type ConfirmProps = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

export function Confirm({
  title,
  description,
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
  onConfirm,
}: ConfirmProps) {
  const { closeModal } = useModalStore();

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      {description && (
        <p style={{ marginBottom: "20px", opacity: 0.8 }}>{description}</p>
      )}

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <button
          onClick={closeModal}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "#e5e5e5",
          }}
        >
          {cancelText}
        </button>

        <button
          onClick={handleConfirm}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "#ff5252",
            color: "white",
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
