import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Login";
import { hostContext } from "./hostContext";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import { updateUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const Router = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/auth/login/success", {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((data) => {
        setUser(data);
        dispatch(updateUser(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

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
      element: !user ? <Login /> : <Navigate to="/" />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
};

export default Router;
