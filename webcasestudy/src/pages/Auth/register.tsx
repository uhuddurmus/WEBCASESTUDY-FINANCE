import React, { useState } from "react";
import { useAppDispatch } from "../../redux/redux-hooks";
import { register } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add confirmPassword state
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Add confirmPasswordError state

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNameBlur = () => {
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      setNameError("Name must contain only letters.");
    } else {
      setNameError("");
    }
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

  const handleConfirmPasswordBlur = () => { // Function to handle confirm password blur
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegister = async () => {
    let valid = true;

    if (name.length < 3 || !/^[a-zA-Z]+$/.test(name)) {
      setNameError("Name must be at least 3 characters long and contain only letters.");
      valid = false;
    } else {
      setNameError("");
    }

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

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      try {
        await dispatch(
          register({
            name,
            email,
            password,
          })
        ).unwrap();
        navigate('/home');  // Navigate to /home after successful registration
      } catch (e) {
        toast.error('Registration failed. Please check your information and try again.');
        console.error(e);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: '18rem' }} className="p-3 bg-white bg-opacity-75">
        <Card.Body>
          <Card.Title className="text-center mb-3">Register</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                isInvalid={!!nameError}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameBlur}
              />
              {nameError && <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>}
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword"> {/* Add confirmPassword form group */}
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                isInvalid={!!confirmPasswordError}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
              />
              {confirmPasswordError && <Form.Control.Feedback type="invalid">{confirmPasswordError}</Form.Control.Feedback>}
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleRegister} className="w-100">
              Register
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/login">Have an account? Login</Link>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;
