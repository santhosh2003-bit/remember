import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreIcon from "@mui/icons-material/More";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from "@mui/icons-material/Done";

import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  Divider,
} from "@mui/material";

import CustomeLinks from "./CustomeLinks";
import useHooks from "../Hooks/useHooks";
const Sidebar = ({ handleLogout, user }) => {
  const [anchorEle, setAnchorEle] = useState(null);
  const openMenu = Boolean(anchorEle);
  const handleClick = (e) => {
    setAnchorEle(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEle(null);
  };

  //Logged User data

  const [loggedUser] = useHooks();
  // console.log(loggedUser);

  const userProfileImage = loggedUser.profile
    ? loggedUser.profile
    : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // console.log(loggedUser.profileImage);
  // console.log(user);
  // console.log(loggedUser.name);

  // console.log(user[0].email.split("@")[0]);
  const result = user[0].email.split("@")[0];
  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar_twittericon" />
      <CustomeLinks to="/home">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </CustomeLinks>
      <CustomeLinks to="/home/explore">
        <SidebarOption active Icon={SearchIcon} text="Search" />
      </CustomeLinks>
      <CustomeLinks to="/home/notifications">
        <SidebarOption active Icon={NotificationsIcon} text="Notification" />
      </CustomeLinks>
      <CustomeLinks to="/home/messages">
        <SidebarOption active Icon={MailOutlineIcon} text="Message" />
      </CustomeLinks>
      <CustomeLinks to="/home/bookmark">
        <SidebarOption active Icon={BookmarkBorderIcon} text="Bookmark" />
      </CustomeLinks>
      <CustomeLinks to="/home/list">
        <SidebarOption active Icon={ListAltIcon} text="List" />
      </CustomeLinks>
      <CustomeLinks to="/home/profile">
        <SidebarOption active Icon={PermIdentityIcon} text="Profile" />
      </CustomeLinks>
      <CustomeLinks to="/home/more">
        <SidebarOption active Icon={MoreIcon} text="More" />
      </CustomeLinks>
      <Button variant="outlined" className="sidebar-tweet">
        Tweet
      </Button>
      <div className="profile-info">
        <Avatar src={userProfileImage}></Avatar>
        <div className="user_info">
          <h4>
            {loggedUser.name ? loggedUser.name : user && user[0].displayName}
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEle}
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem className="profile_info1">
            <Avatar src={userProfileImage}></Avatar>
            <div className="user_info subuser">
              <div>
                <h4>
                  {loggedUser.name
                    ? loggedUser.name
                    : user && user[0].displayName}
                </h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done_icon">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an Existing account</MenuItem>
          <MenuItem onClick={handleLogout}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
