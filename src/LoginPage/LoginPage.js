import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let response;
    let decodedToken;

    try {
      response = await fetch("http://155.138.195.180:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        if (userData.accessToken) {
          handleToken(userData.accessToken);

          decodedToken = decodeToken(userData.accessToken);

          if (decodedToken && decodedToken.userId) {
            const { userId } = decodedToken;
            const { firstname } = userData;

            localStorage.setItem("userId", userId);
            localStorage.setItem("firstname", firstname);

            navigate("/home");
          } else {
            console.error("User ID not found in decoded token:", decodedToken);
          }
        } else {
          console.error("Access token not found in server response:", userData);
        }
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);

    const expirationTime = new Date().getTime() + 60 * 1000;
    localStorage.setItem("tokenExpiration", expirationTime);
  };

  const decodeToken = (token) => {
    try {
      const decodedString = atob(token.split(".")[1]);
      const decodedObject = JSON.parse(decodedString);
      return decodedObject;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <div className="login-container">
      <h1>MY BUDGET</h1>
      <h2>Login to Your Account</h2>
      <form>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
      </form>
      <Link to="/register" className="register-link">
        New user? Register here
      </Link>
    </div>
  );
};

export default LoginPage;
