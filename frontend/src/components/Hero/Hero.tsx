import FirstBlock from "./components/FirstBlock";
import SecoundBlock from "./components/SecoundBlock";

import style from "./Style.module.css";

export default function Hero() {
  return (
    <section className={`${style.hero} container`}>
      <FirstBlock />
      <SecoundBlock />
    </section>
  );
}
