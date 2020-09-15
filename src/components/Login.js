import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import { LOGIN_URL } from '../api/constants';

export const Login = () => {
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      const { token } = data;

      setUser({ email, token });
    } catch (error) {
      if (error.response.data.message) {
        setStatusMessage(error.response.data.message);
      } else {
        setStatusMessage('Something went wrong with our servers!');
      }
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <input type='email' value={email} onChange={onEmailChange} />
        <input type='password' value={password} onChange={onPasswordChange} />
        <button onClick={onSubmit}>
          <Link to='/welcome'>Submit</Link>
        </button>
      </div>
      {statusMessage && <small>{statusMessage}</small>}
    </>
  );
};
