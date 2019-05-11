import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Blogs = new Mongo.Collection('blogs');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish blogs that are public or belong to the current user
  Meteor.publish('blogs', function blogsPublication() {
    return Blogs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'blogs.insert'(data) {
    check(data, Object);

    // Make sure the user is logged in before inserting a blog
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const loginUser = Meteor.users.findOne(this.userId);

    if(!loginUser.role) { 
      throw new Meteor.Error('Only admin can create blog post')
    }
    Blogs.insert({
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      owner: this.userId
    });
  },
  'blogs.remove'(blogId) {
    check(blogId, String);

    const blog = Blogs.findOne(blogId);
    if (blog.owner !== this.userId) {
      // If the blog is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Blogs.remove(blogId);
  },
  'blogs.update'(blogId, data) {
    check(blogId, String);
    check(data, Object);

    const blog = Blogs.findOne(blogId);
    if (blog.owner !== this.userId) {
      // If the blog is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Blogs.update(blogId, { $set: data });
  }
});
