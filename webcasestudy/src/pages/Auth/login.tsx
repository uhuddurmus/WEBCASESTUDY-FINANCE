import React, { useState } from "react";
import { useAppDispatch } from "../../redux/redux-hooks";
import { login } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure bootstrap is imported

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        await dispatch(
          login({
            email,
            password,
          })
          
          
        ).unwrap();
        navigate('/home');  // Navigate to /home after successful login
      } catch (e) {
        toast.error('Login failed. Please check your credentials and try again.');
        console.error(e);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '18rem' }} className="p-3 bg-white bg-opacity-75">
        <Card.Body>
          <Card.Title className="text-center mb-3">Login</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                isInvalid={!!emailError}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
              />
              {emailError && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                isInvalid={!!passwordError}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
              />
              {passwordError && <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>}
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleLogin} className="w-100">
              Login
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Login;
