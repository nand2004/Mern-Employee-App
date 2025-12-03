import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", input);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={input.username} 
               onChange={(e)=>setInput({...input, username: e.target.value})} />
        <input type="password" placeholder="Password" value={input.password} 
               onChange={(e)=>setInput({...input, password: e.target.value})} />
        <button type="submit">Login</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </div>
  );
}

export default Login;
