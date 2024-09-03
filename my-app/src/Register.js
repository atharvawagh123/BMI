import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                email,
                password
            });
            setMessage('Registration successful!');
        } catch (error) {
            setMessage('Error registering user.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-heading">Register</h2>
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    className="register-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="register-button" type="submit">Register</button>
            </form>
            {message && <p className="register-message">{message}</p>}
            <p>Already have an account? <Link to="/" className='Link-login'>Login here</Link></p> {/* Link to Login page */}
        </div>
    );
};

export default Register;
