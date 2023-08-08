import { Route, Navigate, Outlet } from "react-router-dom";

export default function UserIsLoggedIn({ user,location, children }) {
  const data = JSON.parse(localStorage.getItem('authUser'));
  if (!data) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    try {
      if (user && user.emailVerified === false) {
        return <Navigate to="/verify" state={{ from: location }} />;
      } else {
        // authorized so return child components
        return children;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
