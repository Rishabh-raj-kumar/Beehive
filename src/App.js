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
const Chat = lazy(() => import("./pages/chat"));
const Comment = lazy(() => import('./pages/Comments'));
const Verify = lazy(() => import('./pages/Verify'));
const WalkThrough = lazy(() => import('./pages/WalkThrough'));
const Status = lazy(() => import('./pages/Status'));
const BeeComb = lazy(() => import('./pages/BeeComb'));
const ForgotPass = lazy(() => import('./pages/PasswordReset'));
const CheckEmail = lazy(() => import('./pages/checkEmail'));
const Notifier = lazy(() => import('./pages/Notification'));
const Setting = lazy(() => import('./pages/settings'));
const News = lazy(() => import('./pages/News'));
const Help = lazy(() => import('./pages/help'));
import UserIsLoggedIn from "./helpers/userLoggedIn";
import { ChatContextProvider } from "./context/chatContext";

function App() {
  const { user } = useAuthListener();
  return (
    <userContext.Provider value={{ user }}>
      <ChatContextProvider>
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
            <Route path={ROUTES.Verify} element={<Verify />} />
            <Route path={ROUTES.WalkThrough} element={<WalkThrough />} />
            <Route path={ROUTES.profile} element={<Profile />} />
            <Route path={ROUTES.AddPost} element={<Post/>}/>
            <Route path={ROUTES.Chat} element={<Chat/>}/>
            <Route path={ROUTES.status} element={<Status/>}/>
            <Route path={ROUTES.beeCol} element={<BeeComb/>}/>
            <Route path={ROUTES.forgotPass} element={<ForgotPass/>}/>
            <Route path={ROUTES.Settings} element={<Setting/>}/>
            <Route path={ROUTES.checkEmail} element={<CheckEmail/>}/>
            <Route path={ROUTES.Notifier} element={<Notifier/>}/>
            <Route path={ROUTES.news} element={<News/>}/>
            <Route path={ROUTES.help} element={<Help/>}/>
            <Route path={ROUTES.Comments} element={<Comment/>}/>
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
      </ChatContextProvider>
    </userContext.Provider>
  );
}

export default App;
