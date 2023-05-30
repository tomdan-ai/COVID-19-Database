import './App.css';
import Home from './components/Home';
import Details from './components/Details';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryName" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
