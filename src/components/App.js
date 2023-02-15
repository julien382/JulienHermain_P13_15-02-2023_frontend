import '../styles/index.css';
import '../styles/reset.css';
import {Routes, Route} from "react-router-dom"

import Header from './Header/Header';
import Error from '../pages/Error/Error';
import Footer from './Footer/Footer';
import Home from '../pages/Home/Home';

function App() {
  return (
    <div id="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
