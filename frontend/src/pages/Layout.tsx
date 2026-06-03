import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

export default function Layout() {
  return (
    <>
      <header className="navbar">
        <NavLink className="navbar-link" to="/">
          Books
        </NavLink>

        <NavLink className="navbar-link" to="/add">
          Add book
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
