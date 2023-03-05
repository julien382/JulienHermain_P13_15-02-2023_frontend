import '../styles/index.css';
import '../styles/reset.css';
import {Routes, Route} from "react-router-dom"

import Header from './Header/Header';
import Error from '../pages/Error/Error';
import Footer from './Footer/Footer';
import Home from '../pages/Home/Home';
import Login from './Login/Login';
import User from './User/User';

function App() {
  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
