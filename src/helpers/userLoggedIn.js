import { Route, Navigate, Outlet } from "react-router-dom";

export default function UserIsLoggedIn({
  user,
  location,
  children
}) {
  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // authorized so return child components
  return children;
}
