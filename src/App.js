import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading....</p>}>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
