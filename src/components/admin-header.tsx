import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const AdminHeader: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <header className="admin-header">
      <nav className="admin-nav-links">
        <NavLink className="admin-nav-link" to="/admin" exact>Categories</NavLink>
        <NavLink className="admin-nav-link admin-nav-link-words" to="/admin/words" exact>Words</NavLink>
      </nav>
      <button className="logout-button" onClick={() => history.push('/')} type="button">Log out</button>
    </header>
  );
};

export default AdminHeader;
