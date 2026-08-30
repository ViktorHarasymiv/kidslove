import "./styles/globals.css";
import Router from "./Routes/Routes";
import { useEffect } from "react";

import { useAuthStore } from "./services/store/authStore.ts";

function App() {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    const init = () => {
      fetchUser();
    };
    init();
  }, []);

  return <Router />;
}

export default App;
