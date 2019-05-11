/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import SideBar from './sidebar/sidebar';
import AppHeader from '../app/app_header';
import AppFooter from '../app/app_footer';
import BlogListComponent from '../blogs/blogs.list.component';
import BlogAddComponent from '../blogs/blog.add.component';
import BlogEditComponent from '../blogs/blog.edit.component';
import BlogDetailsComponent from '../blogs/blog.details.component'
import AdminRoute from '../../../startup/client/adminRoutes'
import NotFound from '../../pages/not_found/not_found';
import UsersComponent from '../users/list.component';



class Dashboard extends Component {
  
  isAdminUser(){
      const {currentUser} = this.props;
      return (currentUser && currentUser.role && currentUser.role == 'admin')
  }

  render() {
    const { currentUser, history, users } = this.props;
    const contentMinHeight = {
      minHeight: `${window.innerHeight - 101}px`,
    };    

    return (
      <div className="wrapper">
        <AppHeader user={currentUser} history={history} />
        <SideBar user={currentUser} users={users} />
        <div className="content-wrapper" style={contentMinHeight} >
        <Switch>
          <Route exact path="/blog" component={BlogListComponent}/>        
          <Route exact path="/blog/:blogId" component={BlogDetailsComponent}/>
            {
              (this.isAdminUser()) ? <span><AdminRoute path="/admin/blog/add" component={BlogAddComponent}/>
              <AdminRoute path="/admin/blog/edit/:blogId" component={BlogEditComponent}/>
              <AdminRoute path="/admin/users" component={UsersComponent}/> </span>: ''
            }
          <Route path="*" name="not-found" component={NotFound} />
          </Switch>
          
        </div>

        <AppFooter />
        <div className="control-sidebar-bg" />
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.object,
};

export default withTracker(() => {
  /**
   * Add subscriptions here
   */
  Meteor.subscribe('users');
  

  return {
    currentUser: Meteor.user(),
    users: Meteor.users.find().fetch(),
  };
})(Dashboard);
