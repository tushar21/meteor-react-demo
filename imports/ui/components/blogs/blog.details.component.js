import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Blogs } from '../../../api/blogs';
import {Link} from 'react-router-dom';
import './blogs.css'


class BlogDetails extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const { blogDetails } = this.props;
        return(<section className="content">
                <Link to={'/blog'} >All Blogs</Link>
                <h2>{(blogDetails && blogDetails.title)? blogDetails.title: ''}</h2>
                <p>
                    {(blogDetails && blogDetails.description)? blogDetails.description:''}
                </p>
        </section>)       

    }
        
}


export default withTracker((props) => {

    Meteor.subscribe('blogs');

    const blogId = props.match.params.blogId
  
    return {
      blogDetails : Blogs.findOne({_id: blogId})
    };
  })(BlogDetails);
  