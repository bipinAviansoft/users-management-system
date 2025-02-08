import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout, Login, UsersPage } from "./pages/Index";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const authData = useSelector((state) => state.auth.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: authData ? <UsersPage /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: authData ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
