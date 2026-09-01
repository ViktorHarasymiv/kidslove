import { Link } from "react-router-dom";
import { useAuthStore } from "../../../services/store/authStore";
export default function Profile() {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <div>
      {user.badges.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`/badge/${item}`}>My badge : {item}</Link>
          </li>
        );
      })}
    </div>
  );
}
