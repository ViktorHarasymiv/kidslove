import { Link } from "react-router-dom";

import style from "./Style.module.css";

export default function IsBuyPage() {
  return (
    <section className="block_wrapper">
      <div className={style.wrapper}>
        <div className={style.content}>
          <h1>Ten identyfikator NFC nie jest zarejestrowany w systemie.</h1>
          <Link to="/kup-teraz" className="button_link">
            Zamów identyfikator
          </Link>
        </div>
      </div>
    </section>
  );
}
