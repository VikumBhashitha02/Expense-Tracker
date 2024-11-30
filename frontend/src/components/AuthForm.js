import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthForm = () => { 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');  
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async () => {
    try {
      const url = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin 
        ? { email, password }
        : { firstName, lastName, email, phoneNumber, password };

      const response = await axios.post(`http://localhost:5000${url}`, payload);
      setToken(response.data.token);
      
      if (isLogin) {
        // Redirect to Home Page on successful login
        navigate('/');
      } else {
        alert('Signup successful!');
      }
    } catch (err) {
      alert(`${isLogin ? 'Login' : 'Signup'} failed!`);
    }
  };

  return (
    <div className="auth-form">
      <Form>
        {!isLogin && (
          <>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          {isLogin ? 'Login' : 'Signup'}
        </Button>

        <Button
          variant="link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Switch to Signup' : 'Switch to Login'}
        </Button>
      </Form>

      {token && <h5 className="mt-4">JWT Token: {token}</h5>}
    </div>
  );
};

export default AuthForm;
