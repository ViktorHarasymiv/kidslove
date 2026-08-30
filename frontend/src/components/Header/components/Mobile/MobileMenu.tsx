import { useEffect, useState } from "react";
import { MobileMenuButton } from "./MobileMenuButton ";

import style from "./Style.module.css";
import MobileNavList from "./MobileNavList";

interface Props {
  dark?: boolean;
}

export default function MobileMenu({ dark }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div className={style.mobile_menu}>
      <MobileMenuButton
        dark={dark}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />
      {isOpen && <MobileNavList />}
    </div>
  );
}
