import { Routes, Route } from "react-router-dom";
import JakToDziala from "../components/JakToDziala/JakToDziala";
import Funkcje from "../components/Funkcje/Funkcje";
import FAQ from "../components/FAQ/FAQ";
import KupTeraz from "../components/KupTeraz/KupTeraz";
import Home from "../components/Home/Home";
import NotFound from "../components/NotFound/NotFound";
import Layout from "../components/Layout/Layout";
import Login from "../components/Auth/components/Login";
import Signup from "../components/Auth/components/Signup";
import { AuthGuard } from "../components/AuthGuard/AuthGuard";
import { useAuthStore } from "../services/store/authStore";
import Profile from "../components/Auth/Page/Profile";
import Badge from "../components/Badge/Badge";

export default function Router() {
  const { authorized } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<Layout />}>
        {/* AUTH PAGE */}

        {!authorized && (
          <>
            <Route path="/zaloguj-się" element={<Login />} />
            <Route path="/zarejestruj-się" element={<Signup />} />
          </>
        )}

        <Route
          path="/profile"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          }
        />

        {/* BADGE PAGE */}

        <Route path="/badge/:id" element={<Badge />} />

        {/* SINGL PAGE */}

        <Route path="/jak-to-dziala" element={<JakToDziala />} />
        <Route path="/funkcje" element={<Funkcje />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/kup-teraz" element={<KupTeraz />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
