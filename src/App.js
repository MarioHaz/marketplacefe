import { Routes, Route } from "react-router-dom";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";

function App() {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className="App">
      <Routes>
        <Route element={<LoggedInRoutes user={user} />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/profile" element={<Profile user={user} />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes user={user} />}>
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
