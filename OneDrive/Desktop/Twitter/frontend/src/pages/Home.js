import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Widges from "./Widges/Widges";
import { useAuthState } from "react-firebase-hooks/auth";
import "../App.css";
import auth from "../firebase.init";
import { Outlet } from "react-router-dom";

const Home = () => {
  const user = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <div className="app">
      <Sidebar handleLogout={handleLogout} user={user} />
      <div
        style={{
          borderRight: "1px solid gray",
          flex: "0.4",
        }}
      >
        <Outlet />
      </div>
      <Widges />
    </div>
  );
};

export default Home;
