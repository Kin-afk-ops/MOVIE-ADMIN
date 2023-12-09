import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const logoutRef = useRef(null);

  const handleLog = (e) => {
    e.target.classList.toggle("adminActive");
    logoutRef.current.classList.toggle("hidden");
    logoutRef.current.classList.toggle("display__flex");
  };

  return (
    <div className="navbar">
      <h2>CÔNG VIỆC</h2>
      <div className="navbarAdmin" onClick={(e) => handleLog(e)}>
        ADMIN ĐẸP TRAI
        <i class="fa-solid fa-caret-down"></i>
      </div>
      <div className="hidden navbarLogout" ref={logoutRef}>
        Đăng xuất
      </div>

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
          to="/categories"
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
          to="/countries"
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
