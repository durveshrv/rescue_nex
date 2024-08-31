import { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Store/Context";
const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
