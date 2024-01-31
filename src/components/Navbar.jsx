import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/"></Link>
      <Link to="/detail"></Link>
    </nav>
  );
}

export default Navbar;
