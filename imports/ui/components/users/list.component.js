import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class UserListing extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {usersLists} =  this.props;
        return(<section className="content">
                <h2>User Listing</h2>
                    <table className='table table-hover'>
                    <thead><tr><th>Email</th><th>Username</th></tr></thead>
                    <tbody>
                    { usersLists.length ?  
                        usersLists.map((user)=>{
                            return(
                                <tr key={user._id}><td>{user.email}</td><td>{user.username}</td></tr>
                            )
                        }) : <tr><td colSpan={2}>No record found</td></tr>
                    }
                    </tbody>
                    </table>
        </section>)       

    }
        
}


export default withTracker(() => {
    /**
     * Add subscriptions here
     */
    Meteor.subscribe('users');
  
    return {
      usersLists: Meteor.users.find({}).fetch()
    };
  })(UserListing);
  