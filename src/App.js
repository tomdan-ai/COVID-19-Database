import './App.css';
import Home from './components/Home';
import Details from './components/Details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryName" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
