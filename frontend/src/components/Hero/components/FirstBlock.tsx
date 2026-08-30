import Header from "../../Header/Header";
import style from "./Style.module.css";

export default function FirstBlock() {
  return (
    <div className={style.hero_wrapper_top}>
      <Header />
      <div className={style.hero_wrapper_top_inside}>
        <h1 className={style.hero_title}>
          Inteligentna troska o codzienne
          <span className="opacity_text">przygody </span> Twojego dziecka
        </h1>
        <h2 className="special">
          Jedno proste zbliżenie NFC daje dostęp do najważniejszych informacji,
          zapewniając bezpieczeństwo, zaufanie i spokój w każdej sytuacji.
        </h2>
      </div>
    </div>
  );
}
