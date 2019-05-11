import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../../../api/blogs';
import {Link} from 'react-router-dom';
import './blogs.css'


class BlogListing extends Component{

    constructor(props){
        super(props);        
    }

    handleDelete(id){
        Meteor.call('blogs.remove', id, (err, response)=>{
            if(err) {alert('Error in deleting blog'); return}
            alert('Blog deleted succesfully');
        })
    }

    render(){
        const { blogs, currentUser } = this.props;
        const isAdmin = (currentUser && currentUser.role && currentUser.role == 'admin') ? true : false;
        return(<section className="content">
                {isAdmin ? <Link to={'/admin/blog/add'} >Create a new blog</Link>: ''}
                <h2>Blog Listing</h2>
                    <table className='table table-hover'>
                    <thead><tr><th>Title</th><th>Action</th></tr></thead>
                    <tbody>
                    {
                        blogs.map((blog)=>{
                            return(
                                <tr key={blog._id}><td>{blog.title}</td><td>
                                     {isAdmin ? <span><button className="btn btn-danger btn-sm" type='button' onClick={()=>this.handleDelete(blog._id)}>Delete</button>&nbsp;<Link to={`/admin/blog/edit/${blog._id}`} className="btn btn-sm btn-primary">Update</Link></span>: ''}
                                     &nbsp;<Link className="btn btn-primary btn-sm" to={`/blog/${blog._id}`}>Details</Link>  
                                </td></tr>
                            )
                        })
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
    Meteor.subscribe('blogs');
  
    return {
      currentUser: Meteor.user(),
      blogs : Blogs.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  })(BlogListing);
  