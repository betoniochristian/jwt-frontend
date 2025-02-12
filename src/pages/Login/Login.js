import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCloseError = () => setShowError(false);
  const handleCloseSuccess = () => setShowSuccess(false);

  const handleShowError = (message) => {
    setError(message);
    setShowError(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true); // Set loading to true while logging in
  
    try {
      console.log("📌 Attempting login with:", { username, password });

      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("📌 Server Response Status:", response.status);
  
      setLoading(false); // Reset loading state
  
      if (!response.ok) {
        const errorData = await response.json(); // Read JSON error response
        console.error("❌ Login Error:", errorData);
        handleShowError(errorData.message || "Invalid username or password");
        return;
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        if (data.token) {
          console.log("✅ Login Successful. Token Received:", data.token);
          localStorage.setItem("token", data.token); // Store token correctly
          
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/dashboard");  // Redirect to dashboard after success
            setShowSuccess(false);  // Close success modal
          }, 2000);
        } else {
          console.error("❌ Token missing in response!");
          handleShowError("Authentication failed, no token received");
        }
      } else {
        console.error("❌ Unexpected Response Type:", contentType);
        handleShowError("Invalid response from server. Expected JSON.");
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
      setLoading(false);
      handleShowError(error.message || "An error occurred while logging in.");
    }
  };

  return (
    <Container className="login-container d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Form onSubmit={handleLogin} className="form-container p-4 border rounded shadow-sm">
            <h3 className="text-center mb-4">Login</h3>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center mt-3">
              <span>Not registered? </span>
              <Link to="/register">Create one</Link>
            </div>
          </Form>
        </Col>
      </Row>

      {/* Error Modal */}
      <Modal show={showError} onHide={handleCloseError} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={handleCloseSuccess} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login successful! Redirecting to the dashboard...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
