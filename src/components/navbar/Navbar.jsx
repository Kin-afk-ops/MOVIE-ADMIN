import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
    <div className="navbar">
      <h2>CÔNG VIỆC</h2>
      <div
        className={navActive ? "navbarAdmin adminActive" : "navbarAdmin"}
        onClick={() => setNavActive(!navActive)}
      >
        ADMIN ĐẸP TRAI
        <i class="fa-solid fa-caret-down"></i>
      </div>
      <div className={navActive ? "navbarLogout" : "hidden"}>Đăng xuất</div>

      <ul>
        <NavLink
          to="/movies?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i class="fa-solid fa-film"></i>
            Phim
          </li>
        </NavLink>
        <NavLink
          to="/categories?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i class="fa-solid fa-list"></i>
            Danh mục
          </li>
        </NavLink>
        <NavLink
          to="/countries?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i class="fa-solid fa-earth-americas"></i>
            Quốc gia
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
