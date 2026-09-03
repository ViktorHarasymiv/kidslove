import UserTile from "./UserTile";
import ChildrenTile from "./ChildrenTile";

import style from "./Style.module.css";

export default function Main() {
  return (
    <div className={style.main_wrapper}>
      <UserTile />
      <ChildrenTile />
    </div>
  );
}
