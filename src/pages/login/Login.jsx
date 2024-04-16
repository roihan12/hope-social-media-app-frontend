import { Link } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {useNavigate} from "react-router-dom"
const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>HOPE!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil,
            veniam atque cumque ipsam quibusdam dolorem vero velit aliquid
            aspernatur debitis!
          </p>
          <span>Don&lsquo;t you have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>

        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && error}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
