import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from "./Login";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import { updateUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import Friends from "./Friends";
import Profile from "./Profile";
const Router = () => {
  const initialUser = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      if(initialUser){
        fetch("https://odinbook-server-production-a812.up.railway.app/auth/local/success", {
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
            if(data){
            setUser(data);
            dispatch(updateUser(data));
            setLoading(false);}
            else{
              dispatch(updateUser(initialUser));
            }
          })
          .catch((error) => {
            dispatch(updateUser(initialUser));
            console.error(error);
            setLoading(false);
          });
      }else{
        fetch("https://odinbook-server-production-a812.up.railway.app/auth/auth/login/success", {
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
            if(data){
            setUser(data);
            dispatch(updateUser(data));
            setLoading(false);}
            else{
              dispatch(updateUser(initialUser));
            }
          })
          .catch((error) => {
            console.error(error)
            setLoading(false);
          });
      }
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
