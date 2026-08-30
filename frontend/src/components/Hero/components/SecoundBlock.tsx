import style from "./Style.module.css";

import Background from "../../../assets/hero.png";

export default function SecoundBlock() {
  return (
    <div className={style.hero_wrapper_bottom}>
      {" "}
      <img src={Background} alt="hero" />
    </div>
  );
}
