import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/useAuthListener';
import userContext from './context/usercontext';


const Signup = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const NotFound = lazy(() => import('./pages/Notfound'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {

  const {user} = useAuthListener();
  return (
    <userContext.Provider value={{user}}>
    <Router>
      <Suspense fallback={<p>Loading....</p>}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} exact element={<Dashboard/>}/>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.Signup} element={<Signup />}/>
          <Route path={'*'} element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </Router>
    </userContext.Provider>
  );
}

export default App;
