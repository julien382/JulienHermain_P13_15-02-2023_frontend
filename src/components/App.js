import { useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom"

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import User from '../pages/User/User';

import '../styles/reset.css';
import '../styles/index.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // check if there is a JWT in the local storage
    const JWT = localStorage.getItem('access-token');
    if(JWT) {
      navigate('/user');
    }
  }, [])


  return (
    <div id="app">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />1
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/error" element={<Error />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
