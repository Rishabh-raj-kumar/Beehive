import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/useAuthListener";
import userContext from "./context/usercontext";

const Signup = lazy(() => import("./pages/signup"));
const Login = lazy(() => import("./pages/login"));
const NotFound = lazy(() => import("./pages/Notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Post = lazy(() => import('./Components/post/Post'));

import UserIsLoggedIn from "./helpers/userLoggedIn";

function App() {
  const { user } = useAuthListener();
  return (
    <userContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading....</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <UserIsLoggedIn user={user} location={ROUTES.DASHBOARD}>
                  <Dashboard />
                </UserIsLoggedIn>
              }
            />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.Signup} element={<Signup />} />
            <Route path={ROUTES.profile} element={<Profile />} />
            <Route path={ROUTES.AddPost} element={<Post/>}/>
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </userContext.Provider>
  );
}

export default App;
