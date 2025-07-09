import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-inner text-center py-4">
        <h5 className="footer-title">💼 Personal Transaction Manager</h5>
        <p className="footer-desc">Track your income & expenses with ease.</p>

        <div className="social-icons my-3">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>

        <hr className="footer-divider" />
        <p className="footer-copy mb-0">
          &copy; {new Date().getFullYear()} <strong>Prathmesh sabale</strong> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
