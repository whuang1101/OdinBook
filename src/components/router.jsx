import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Login";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import { updateUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Friends from "./Friends";
import Profile from "./Profile";
import { apiFetch } from "../lib/apiClient";
import DemoApp from "./DemoApp";
const Router = () => {
  const demoMode = new URLSearchParams(window.location.search).get("demo") === "1";
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (demoMode) {
      setLoading(false);
      return;
    }
    apiFetch("/auth/me")
      .then((data) => {
        setUser(data);
        dispatch(updateUser(data));
      })
      .catch(() => {
        localStorage.removeItem("userData");
      })
      .finally(() => setLoading(false));
  }, [dispatch, demoMode]);

  if (demoMode) {
    return <DemoApp />;
  }

  if (loading) {
    return null;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Homepage setUser ={setUser}/> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: !user ? <Login setUser ={setUser}/> : <Navigate to="/" />,
    },
    {
      path: "/friends",
      element: user ? <Friends setUser ={setUser}/> : <Navigate to="/login" />,
    },
    {
      path: "/profile/:id",
      element: user ? <Profile setUser ={setUser}/> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
};

export default Router;
