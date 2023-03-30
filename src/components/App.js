import {Routes, Route, Navigate} from "react-router-dom"

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Error from '../pages/Error/Error';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import User from '../pages/User/User';

import '../styles/reset.css';
import '../styles/index.css';

function App() {
  const jwt = localStorage.getItem("access-token");


    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={jwt ? <Navigate to="/" /> : <Login />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </>
    );
  }

export default App;