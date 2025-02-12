import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success modal
  const navigate = useNavigate();

  const handleCloseError = () => setShowError(false);
  const handleCloseSuccess = () => setShowSuccess(false); // Close success modal
  const handleShowError = (message) => {
    setError(message);
    setShowError(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      setSuccess("Registration successful! Redirecting to login...");
      setShowSuccess(true); // Show success modal
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (error) {
      handleShowError(error.message); // Show the error message
    }
  };

  return (
    <Container className="register-container d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <Form onSubmit={handleRegister} className="form-container p-4 border rounded shadow-sm">
            <h3 className="text-center mb-4">Register</h3>

            {success && <p className="text-success text-center">{success}</p>}

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

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>

            <div className="text-center mt-3">
              <span>Already have an account? </span>
              <Link to="/login">Login</Link>
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
        <Modal.Body>{success}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
