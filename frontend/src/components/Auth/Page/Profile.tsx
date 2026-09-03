import { useAuthStore } from "../../../services/store/authStore";
import Main from "./components/Main/Main";
import TabsPage from "./components/TabsPage/TabsPage";

import style from "./Style.module.css";

export default function Profile() {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <section className={style.section_wrapper}>
      <Main />
      <TabsPage />
    </section>
  );
}
