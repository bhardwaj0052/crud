import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import UserList from "./components/userList";
import Dashboard from "./components/dashboard";
import { getUser} from "./services/userService";
import type { User } from "./types/user";
import UserForm from "./components/userForm";
import UserCard from "./components/userCard";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getUser();
        setUsers(response);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
    const handleSubmit = (name: string, email: string, id?: number) => {
    if (id !== undefined) {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name, email } : u)));
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
      setUsers((prev) => [...prev, { id: newId, name, email }]);
    }
};
const handleDelete = (id: number) => {
  setUsers(users.filter((u) => u.id !== id));
};

  return (
    <div className="app">
      <Navbar />
      <div className="body-wrap">
        <Sidebar />
        <main>
          {loading ? (
            <div>loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/users"
                element={<UserList users={users} onDelete={handleDelete} />}
              />
              <Route path="/users/add" element={<UserForm users={users} onSave={handleSubmit} />} />
              <Route
                path="/users/edit/:id"
                element={<UserForm users={users} onSave={handleSubmit} />}
              />
              <Route path="/user/view/:id" element={<UserCard users={users}/>} />
            </Routes>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;