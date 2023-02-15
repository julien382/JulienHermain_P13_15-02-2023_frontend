import '../styles/index.css';
import '../styles/reset.css';
import {Routes, Route} from "react-router-dom"

import Error from '../pages/Error/Error';
import Footer from './Footer/Footer';

function App() {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Error />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
