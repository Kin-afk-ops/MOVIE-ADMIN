import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/grid.css";
import "./css/global.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./page/home/Home";
import Movies from "./page/movies/Movies";
import Categories from "./page/categories/Categories";
import Countries from "./page/countries/Countries";
import Login from "./page/login/Login";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  user && window.localStorage.setItem("token", user.accessToken);

  console.log(user);

  const Layout = () => {
    return (
      <div className="grid">
        <div className="row no-gutters">
          <div className="c-2">
            <Navbar />
          </div>
          <div className="c-10">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: !user ? <Navigate to="/login" /> : <Home />,
        },

        {
          path: "/movies",
          element: !user ? <Navigate to="/login" /> : <Movies />,
        },

        {
          path: "/categories",
          element: !user ? <Navigate to="/login" /> : <Categories />,
        },

        {
          path: "/countries",
          element: !user ? <Navigate to="/login" /> : <Countries />,
        },

        {
          path: "/login",
          element: user ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
