// src/routes/Routes.tsx
import { Navigate, RouteProps, useRoutes } from "react-router-dom";
import Login from "../pages/login/index.tsx";
import Dashboard from "../pages/dashboard/index.tsx";
import Register from "../pages/register/index.tsx";
import { useAuth } from "../contexts/AuthContext.tsx"; // Import PrivateRoute

export default function Routes() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <PrivateRoute element={<Dashboard />}/>, // Use PrivateRoute for Dashboard
    },
    {
      path: "*",
      element: <Navigate to="/dashboard" />,
    },
  ]);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
interface PrivateRouteProps extends RouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};
