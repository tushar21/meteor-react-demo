/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
const LOGIN_URL = '/login';

const isAdminuser = () => {
  const user = Meteor.user(); 
  
  return (user && user.role && user.role == 'admin')

} 



const AdminRoute = ({ component, ...props }) => {
  if (isAdminuser() ) {
    return <Route {...props} component={component} />;
  }

  return <Redirect to={'/not-found'} />;
};

AdminRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
};

export default AdminRoute;
