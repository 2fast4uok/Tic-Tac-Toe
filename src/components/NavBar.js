import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-center">
      <ul className="text-3xl flex justify-between w-1/3">
        <li className="hover:text-blue-500 underline">
          <NavLink
            to="/three"
            className={({ isActive }) => {
              return isActive ? "active-link" : "";
            }}
          >
            3x3
          </NavLink>
        </li>
        <li className="hover:text-blue-500 underline ">
          <NavLink to="/six">6x6</NavLink>
        </li>
        <li className="hover:text-blue-500 underline">
          <NavLink to="/ten">10x10</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
