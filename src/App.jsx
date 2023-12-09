import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/grid.css";
import "./css/global.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./page/home/Home";
import Movies from "./page/movies/Movies";
import Categories from "./page/categories/Categories";
import Countries from "./page/countries/Countries";

const App = () => {
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
          element: <Home />,
        },

        {
          path: "/movies",
          element: <Movies />,
        },

        {
          path: "/categories",
          element: <Categories />,
        },

        {
          path: "/countries",
          element: <Countries />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
