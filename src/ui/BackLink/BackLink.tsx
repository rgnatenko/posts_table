import React from 'react';
import { Link } from 'react-router-dom';

export const BackLink: React.FC = () => (
  <Link
    to="/"
    className="postpage__back-link"
  >
    <div className="icon icon--back postpage__back-icon" />
    Back to home page
  </Link>
);
