import React from 'react';
import PropTypes from 'prop-types';

/**
 * display a user's image and username
 * @function UserView
 *
 * @param {object} props
 *
 * @param {string} imageLink
 *
 * @param {string} username
 *
 * @return {object} UserView component
 */
const UserView = ({
  imageLink, username, firstname, email
}) => (
  <li>
    <div className="user-view">
      <a className="modal-trigger" role="button" href="#user1" tabIndex="-1">
        <img className="circle" src={imageLink} alt={username} />
      </a>
      <a href="www.andela.com">
        <span className="black-text name">{username}</span>
      </a>
      <a href="#!name">
        <span className="black-text name">{firstname}</span>
      </a>
      <a href="#!email">
        <span className="black-text email">{email}</span>
      </a>
    </div>
  </li>
);

UserView.propTypes = {
  imageLink: PropTypes.string,
  username: PropTypes.string,
  firstname: PropTypes.string,
  email: PropTypes.string
};


export default UserView;
