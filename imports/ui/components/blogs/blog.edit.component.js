import {Meteor} from 'meteor/meteor';
import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Blogs} from '../../../api/blogs';
import {Link} from 'react-router-dom';
class BlogEditPage extends Component {


  constructor (props) {
    super (props);
    this.state = {blog: {title: '', description: ''}};
    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  componentDidUpdate(prevProps){
      if(prevProps.blogDetails != this.props.blogDetails){
          this.setState({blog: this.props.blogDetails})
      }
  }

  handleSubmit () {
    const {title, description} = this.state.blog;
    Meteor.call ('blogs.update', this.state.blog._id, {title, description}, (err, response) => {
      if (err) {
        alert (err.error);
        return false;
      }
      alert ('Blog updated successfully!!');
    });
    event.preventDefault ();
  }

  handleChange (key, event) {
    this.setState ({blog: {...this.state.blog, [key]: event.target.value}});
  }

  render () {
    const {blog} = this.state;   
    console.log(this.props, 'props')

    return (
      <section className="content">
        <Link to={'/blog'}>Blogs Listing</Link>
        <h2>Update blog</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group has-feedback">
            <input
              type="text"
              onChange={event => this.handleChange ('title', event)}
              value={blog.title}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group has-feedback">
            <textarea
              onChange={event => this.handleChange ('description', event)}
              value={blog.description}
              className="form-control"
              placeholder="Description"
            />
          </div>

          <div className="row">
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Update
              </button>
            </div>
          </div>
        </form>

      </section>
    );
  }
}

export default withTracker ((props) => {
  Meteor.subscribe ('blogs');
  const blogId = props.match.params.blogId;
  return {
    currentUser: Meteor.user(),
    blogDetails: Blogs.findOne(blogId),
  };
}) (BlogEditPage);
