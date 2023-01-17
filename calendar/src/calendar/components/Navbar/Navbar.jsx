import React from 'react';
import { useAuthStore } from '../../../hooks';

const Navbar = () => {
  const { startLogOut, user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4 text-light">
      <span>
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user.name}
      </span>

      <button className="btn btn-outline-danger" onClick={startLogOut}>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};

export default Navbar;
