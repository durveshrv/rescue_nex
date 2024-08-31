import './App.css';
import { useContext,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './screens/Home';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Dash1 from './screens/Dash1';
import Card from './components/Card';
import Navbar from './components/Navbar.js';
import { AuthContext } from "./Store/Context.jsx";
import Logout from './components/logout.jsx';
function App() {
  const { setVerifiedBtnVisible } = useContext(AuthContext);
  const location = useLocation();
  const {setUser}=useContext(AuthContext);
  const callAboutPage = async () => {
    try {
      const res = await axios.get("http://localhost:3001/about", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        credentials: "include",
      });
      const re= await res.data;
      console.log(re);
      if(re.verified) setUser(re);
    } catch (err) {
      if (err) {
        console.log(err); // Set state to true for redirection
      }
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  useEffect(() => {
    const path = location.pathname;
    setVerifiedBtnVisible (
      path === "/dash1"
    );
  }, [location,setVerifiedBtnVisible]);
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dash1" element={<Dash1 />} />
        <Route path="/dash2" element={<Card />} />
        <Route path="/users/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
