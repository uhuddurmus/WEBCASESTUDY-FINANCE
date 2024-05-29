import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./redux/redux-hooks";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./Layout/Navbar";
import { Container } from "react-bootstrap";
function App() {
  const userProfileData = useAppSelector((state) => state.auth.userProfileData);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  return (
    <>
      <Header />
      <Container className="mt-2">
      {basicUserInfo || userProfileData ? (
        <Router>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      )}
      </Container>

    </>
  );
}

export default App;
