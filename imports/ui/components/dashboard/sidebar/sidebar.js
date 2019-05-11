import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SideBarUserPanel from './sidebar_user_panel';
import SideBarSearchPanel from './sidebar_search_panel';
import SideBarMenu from './sidebar_menu';
import AdminSideBarMenu from './sidebar_menu_admin';

export default class SideBar extends Component {
  componentDidMount() {
    $('.sidebar-menu').tree();
  }

  userDisplayName() {
    const currentUser = this.props.user;
    let name = 'Alexander Pierce';

    if (currentUser) {
      name = currentUser.emails[0].address;
    }

    return name;
  }

  render() {
    const {user} = this.props; 
    const isAdmin = (user && user.role && user.role == 'admin');
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <SideBarUserPanel userName={this.userDisplayName()} />
          <SideBarSearchPanel />
          {isAdmin ? <AdminSideBarMenu userCount={this.props.users.length} /> : <SideBarMenu />}
          
        </section>
      </aside>
    );
  }
}

SideBar.propTypes = {
  user: PropTypes.object,
  users: PropTypes.array,
};
