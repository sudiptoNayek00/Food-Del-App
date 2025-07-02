import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/frontend-assets/assets";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login({ setLogin }) {
  const [currentstate, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setconfirmPassword] = useState(true);
  const {url,setToken}=useContext(StoreContext);
  const [data,setData]= useState({
    name:"",
    email: "",
    password: "",
    confirmpassword: "",
  })
  const onChangeHandelar = (e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData((prev)=>{
      return {...prev,[name]:value}
    })
  } 

  const onSubmitHandelar = async (e) => {
    e.preventDefault();
    let newUrl = url;
    let requestData = {};
    if (currentstate === "Login") {
      newUrl += "/api/user/login";
      requestData = {
        email: data.email,
        password: data.password,
      };
    } else {
      newUrl += "/api/user/register";
      // Client-side password match check
      if (data.password !== data.confirmpassword) {
        toast.error("Password and Confirm Password do not match");
        return;
      }
      // Prepare request data for registration
      requestData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword 
      };
    }

    try {
      const response = await axios.post(newUrl, requestData);
            if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setLogin(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error during login or registration:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  
  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onSubmitHandelar}>
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currentstate === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="your name"
              name="name"
              value={data.name}
              required
              onChange={onChangeHandelar}
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandelar}
            type="email"
            placeholder="Your email"
            required
          />
          <div
            className="password-input-wrapper"
            style={{ position: "relative" }}
          >
            <input
              name="password"
              value={data.password}
              onChange={onChangeHandelar}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          {currentstate === "Sign Up" ? (
            <div
              className="password-input-wrapper"
              style={{ position: "relative" }}
            >
              <input
                name="confirmpassword"
                value={data.confirmpassword}
                onChange={onChangeHandelar}
                type={confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
              />
              <span
                onClick={() => setconfirmPassword(!confirmPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <button type="submit">
          {currentstate === "Sign Up" ? "Create account" : "LogIn"}
        </button>
        {currentstate === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>I accept all terms and conditions & privacy policy</p>
          </div>
        )}
        {currentstate === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
