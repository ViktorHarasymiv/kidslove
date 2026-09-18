import { Link } from "react-router-dom";

import { Icons } from "../../../../../ui/Icons/icons";
import style from "./Style.module.css";
import { useModalStore } from "../../../../../store/modalStore";
import { Confirm } from "../../../../../ui/Confirm/Confirm";
interface Props {
  link: string | null | undefined;
}

export default function SetupChildTile({ link }: Props) {
  const { openModal } = useModalStore.getState();

  //   OPEN MODAL
  function openEdytModal() {
    openModal(
      <Confirm
        title="Підтвердження"
        description="Ви точно хочете видалити дитину?"
        onConfirm={() => {
          console.log("Видаляємо дитину...");
        }}
      />,
    );
  }

  return (
    <div className={style.setup_wrapper_tile}>
      <ul className={style.setup_list}>
        <li>
          <Link to={`/badge/${link}`}>
            <Icons.link /> Przejdź do strony
          </Link>
        </li>
        <li onClick={() => openEdytModal()}>
          <Icons.settings /> Edytuj
        </li>
        <li>
          <Icons.trash /> Usunąć
        </li>
      </ul>
    </div>
  );
}
