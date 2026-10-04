import { Link } from 'react-router-dom';
import '../index.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to={"/"}><div className="sidebar-item">Dashboard</div></Link>
      <Link to={"/task"}><div className="sidebar-item">Tasks</div></Link>
    </aside>
  );
}