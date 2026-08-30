import AuthList from "../AuthList";
import NavList from "../NavList";
import style from "./Style.module.css";

export default function MobileNavList() {
  return (
    <div className={style.mobile_list}>
      <NavList light />
      <AuthList light mobile />
    </div>
  );
}
