/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom/dist';
import Nav from 'react-bootstrap/Nav';
import styles from './Header.module.css';

const Header = () => (
  <Nav className="navbar navbar-expand-lg navbar-light bg-light" data-au="nav-bar">
    <ul className="navbar-brand">Hotel Bookings</ul>
    <ul className="nav-item">
      <CustomLink
        to="/patients"
        className="nav-item nav-link"
      >
        Patients
      </CustomLink>
    </ul>
  </Nav>
);

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });
  return (
    <li className={isActive ? styles.active : ''}>
      <Link
        to={to}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
};

export default Header;
