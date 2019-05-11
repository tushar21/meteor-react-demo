import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="lockscreen-wrapper">


    <div className="text-center">
      <Link to="/login">Sign in </Link>or
      <Link to="/signup"> Register</Link>
    </div>
    <div className="lockscreen-footer text-center">
      Copyright © 2014-2017&nbsp;
      <br />
      All rights reserved
    </div>
  </div>
);

export default Home;
