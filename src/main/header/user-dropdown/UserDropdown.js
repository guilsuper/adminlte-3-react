import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserDropdown = (props) => {
  const { email, image } = props;

  const dropdownRef = useRef(null);

  const [dropdownState, updateDropdownState] = useState({ isDropdownOpen: false });

  const toggleDropdown = () => {
    updateDropdownState({ isDropdownOpen: !dropdownState.isDropdownOpen });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      updateDropdownState({ isDropdownOpen: false });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

  let className = 'dropdown-menu dropdown-menu-lg dropdown-menu-right';

  if (dropdownState.isDropdownOpen) {
    className += ' show';
  }

  return (
    <li ref={dropdownRef} className="nav-item dropdown user-menu">
      <button onClick={toggleDropdown} type="button" className="nav-link dropdown-toggle" data-toggle="dropdown">
        <img src={image || '/img/default-profile.png'} className="user-image img-circle elevation-2" alt="User" />
        {/* <span className="d-none d-md-inline">{email}</span> */}
      </button>
      <ul className={className}>
        <li className="user-header bg-primary">
          <img src={image || '/img/default-profile.png'} className="img-circle elevation-2" alt="User" />
          <p>
            {/* Alexander Pierce - Web Developer */}
            {email}
            <small>Member since Nov. 2012</small>
          </p>
        </li>
        <li className="user-body">
          <div className="row">
            <div className="col-4 text-center">
              <Link to="/">Followers</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">Sales</Link>
            </div>
            <div className="col-4 text-center">
              <Link to="/">Friends</Link>
            </div>
          </div>
        </li>
        <li className="user-footer">
          <Link to="/" className="btn btn-default btn-flat">
            Profile
          </Link>
          <button type="button" className="btn btn-default btn-flat float-right">
            Sign out
          </button>
        </li>
      </ul>
    </li>
  );
};

UserDropdown.propTypes = {
  email: PropTypes.string.isRequired,
  image: PropTypes.string
};

UserDropdown.defaultProps = {
  image: null
};

export default UserDropdown;
