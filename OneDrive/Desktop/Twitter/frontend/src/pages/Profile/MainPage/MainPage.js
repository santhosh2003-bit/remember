import React, { useEffect, useState } from "react";
import "./MainPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import useHooks from "../../Hooks/useHooks";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Post from "../../Feed/Post";
import axios from "axios";
const MainPage = ({ user }) => {
  const [loggedUser] = useHooks();
  const navigate = useNavigate();
  const [post, setPost] = useState([]);

  const username = user.email.split("@")[0];
  //console.log(loggedUser);
  const handleCoverImageUploading = (e, email) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      //let create a api to Upload the image
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((data) => {
          // console.log(data.data.data.url);
          if (data.data.data.url) {
            fetch("http://localhost:5000/background", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
                background: data.data.data.url,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data.user.background);
                // console.log(data);
              });
          }
        });
    }
  };
  const handleUploadProfileImage = (e, email) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      // let create a api to Upload the image
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((data) => {
          if (data.data.data.url) {
            fetch("http://localhost:5000/profile", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
                profile: data.data.data.url,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
              });
          }
        });
    }
  };

  useEffect(() => {
    if (loggedUser.email) {
      fetch(`http://localhost:5000/user/posts/${loggedUser.email}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [post, loggedUser.email]);

  return (
    <div>
      <ArrowBackIcon
        className="arrow-icon"
        style={{
          fontSize: "50px",
          float: "left",
          marginLeft: "10px",
          // backgroundColor: "blue",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <h4 className="heading-4">@{username}</h4>

      <div className="main-page">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img
                  src={
                    loggedUser.background
                      ? loggedUser.background
                      : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="this is img"
                  className="coverImage"
                />
                <div className="hoverCoverImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="image">
                      <CenterFocusWeakIcon
                        className="imageIcon"
                        style={{ color: "aqua", fontSize: "45px" }}
                      />
                    </label>
                    <input
                      type="file"
                      id="image"
                      className="imageInput"
                      onClick={(e) =>
                        handleCoverImageUploading(e, loggedUser.email)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer">
                  <img
                    src={
                      loggedUser.profile
                        ? loggedUser.profile
                        : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="this is img"
                    className="coverImage"
                  />
                </div>
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imageIcon">
                      <CenterFocusWeakIcon
                        style={{ color: "aqua", fontSize: "45px" }}
                        className="photoIcon"
                      />
                    </label>
                    <input
                      type="file"
                      id="profileImage"
                      className="imageInput"
                      onClick={(e) =>
                        handleUploadProfileImage(e, loggedUser.email)
                      }
                    />
                  </div>
                </div>
                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedUser.name
                        ? loggedUser.name
                        : user && user.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                  </div>
                  <div className="infoContainer">
                    {loggedUser.bio ? loggedUser.bio : ""}
                    <div className="locationAndLink">
                      {loggedUser.location ? (
                        <p className="subInfo">
                          <MyLocationIcon /> {loggedUser.location}
                        </p>
                      ) : (
                        ""
                      )}
                      {loggedUser.website ? (
                        <p className="subInfo">
                          <AddLinkIcon /> {loggedUser.website}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="Tweet">
                    <h4 className="tweetsText">Tweets</h4>
                  </div>
                </div>
                <div className="posted_Data">
                  {post.map((data, index) => {
                    return <Post key={index} data={data}></Post>;
                  })}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;
