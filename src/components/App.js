import '../styles/index.css';
import '../styles/reset.css';
import {Routes, Route} from "react-router-dom"
import { Provider } from "react-redux";
import store from "../services/store";

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
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />1
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
