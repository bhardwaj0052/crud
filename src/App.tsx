import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import UserList from "./components/userList";
import Dashboard from "./components/dashboard";
import UserForm from "./components/userForm";
import UserCard from "./components/userCard";
import Authform from "./components/authform";

function App() {
  const { pathname } = useLocation();
  const showsidebar = pathname === "/login";

  return (
    <div className="app">
      <Navbar />
      <div className="body-wrap">
        {!showsidebar && <Sidebar />}
        <main>
            <Routes>
              <Route path="/login" element={<Authform/>}/>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task" element={<UserList />} />
              <Route path="/task/add" element={<UserForm />} />
              <Route path="/task/edit/:id" element={<UserForm />} />
              <Route path="/task/view/:id" element={<UserCard />} />
            </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
