
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Login />,
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;