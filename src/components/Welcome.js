import React from 'react';
import { Link } from 'react-router-dom';

export const Welcome = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <p>You're seeing this because you're authenticated!</p>

      <p>
        See some authenticated only information at: <Link to='/info'>Info</Link>
      </p>
    </div>
  );
};
