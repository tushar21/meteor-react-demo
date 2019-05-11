/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';

Meteor.publish('users', () => Meteor.users.find({}, {fields: {role: true}}));
Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        fields: { role: 1 }
      });
    } else {
      this.ready();
    }
  });
  
  