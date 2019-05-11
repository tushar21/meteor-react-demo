import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AdminSideBarMenu = ({ userCount }) => (
  <ul className="sidebar-menu" data-widget="tree">
    <li className="header">MAIN NAVIGATION</li>

    <li className="active treeview">
      <a href="#">
        <i className="fa fa-dashboard" /><span>Blog</span>
        <span className="pull-right-container">
          <i className="fa fa-angle-left pull-right" />
        </span>
      </a>
      <ul className="treeview-menu">
        <li className="active">
          <Link to="/blog"><i className="fa fa-circle-o" /> List</Link>
        </li>
        <li><Link to={'/admin/blog/add'} href="#"><i className="fa fa-circle-o" />Create New</Link></li>
      </ul>
    </li>
    <li>
      <Link to="/admin/users">
        <i className="fa fa-users" /> <span> Users </span>
        <small className="label pull-right bg-blue" > {userCount} </small>
      </Link>
    </li>
  </ul>
);

AdminSideBarMenu.propTypes = {
  userCount: PropTypes.number,
};

export default AdminSideBarMenu;
