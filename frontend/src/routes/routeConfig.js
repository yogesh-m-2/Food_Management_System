import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";

const routeConfig = [
  { path: "/login", element: <Login />, isPrivate: false },
  { path: "/dashboard", element: <Dashboard />, isPrivate: true },
  { path: "/profile", element: <Profile />, isPrivate: true },
  { path: "/settings", element: <Settings />, isPrivate: true },
  { path: "*", element: <NotFound />, isPrivate: false }, // Fallback for undefined routes
];

export default routeConfig;