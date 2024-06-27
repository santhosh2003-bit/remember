import React, { useState } from "react";
import twitterimage from "../../assets/twitterimage.avif";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { GoogleButton } from "react-google-button";
import { Link, Navigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import "./Login.css";
import Loading from "../Loading";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  if (user) {
    return <Navigate to="/login" />;
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    <Loading />;
  }

  //   Sign in with Google

  if (googleuser) {
    console.log(googleuser);
  }
  if (googleerror) {
    console.log(googleerror.message);
  }
  if (googleloading) {
    <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else {
          console.log(data.error);
        }
      });
  };
  const handleSignwithGoogle = () => {
    signInWithGoogle();
  };
  return (
    <div className="login-container">
      <div className="image-container">
        <img src={twitterimage} alt="imageElement" className="imageElement" />
      </div>
      <div className="form-box">
        <div className="form-container">
          <h2 className="heading">Happing Now</h2>
          <h3 className="heading1">Join Twitter today</h3>
          <TwitterIcon
            className="Twittericon"
            style={{ color: "skyblue", fontSize: "50px" }}
          />
          <form onSubmit={handleSubmit} className="form-element">
            <input
              type="text"
              placeholder="Username"
              className="display-name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              className="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-signup">
              <button type="submit" className="btn">
                Sign Up
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              type="light"
              className="g-btn"
              onClick={handleSignwithGoogle}
            />
          </div>
          <div style={{ marginTop: "10px", fontSize: "18px" }}>
            Already If you have an account{" "}
            <Link
              style={{
                color: "sky-blue",
                textDecoration: "none",
                fontWeight: "600",
                marginLeft: "5px",
              }}
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
