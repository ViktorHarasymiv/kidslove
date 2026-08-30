import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout() {
  const dark = useLocation().pathname !== "/";

  return (
    <div className="container">
      <Header dark={dark} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
