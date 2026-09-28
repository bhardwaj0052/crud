import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import type { User } from "../types/user";

interface Prop {
  users: User[];
}

export default function UserCard({ users }: Prop) {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === Number(id));

  if (!user) return <div>User not found</div>;

  return (
    <div className="user-card">
      <div className="row">
        <div className="initials">{user.id}</div>
        <div>
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>
      <button onClick={() => navigate("/users")}>Back</button>
    </div>
  );
}