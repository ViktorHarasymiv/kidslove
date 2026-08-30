import Content from "../../../assets/auth_content.png";

import style from "./Style.module.css";

export default function AuthDecor() {
  return (
    <div className={style.decor_wrapper}>
      <img src={Content} alt="" className={style.absolute_content} />
      <div className={style.content_block}>Content</div>
    </div>
  );
}
