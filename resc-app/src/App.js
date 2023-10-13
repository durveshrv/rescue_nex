import './App.css';
import Home from './screens/Home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Dash1 from './screens/Dash1';
import Card from './components/Card';

function App() {
  return (
    <>
    <div>
      <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route  path="/dash1" element={<Dash1/>} />
          <Route  path="/dash2" element={<Card/>} /> {/* Define a route for Dash1 */}
        </Routes>
      </div>
    </Router>
    </div>
    </>
  );
}

export default App;
