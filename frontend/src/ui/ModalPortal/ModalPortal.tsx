// components/ModalPortal.tsx
import { createPortal } from "react-dom";
import style from "./Style.module.css";
import { useModalStore } from "../../store/modalStore";

export function ModalPortal() {
  const { open, content, closeModal } = useModalStore();

  if (!open) return null;

  return createPortal(
    <div className={style.modal_overlay} onClick={closeModal}>
      <div className={style.modal_window} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>,
    document.body,
  );
}
