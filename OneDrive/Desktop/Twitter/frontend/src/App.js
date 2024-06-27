import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loading from "./pages/Loading";
import Bookmark from "./pages/Bookmark/Bookmark";
import Explore from "./pages/Explore/Explore";
import Notifications from "./pages/Notifications/Notifications";
import Message from "./pages/Message/Message";
import More from "./pages/More/More";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import List from "./pages/List/List";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/home/feed" />} />
          </Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/home/feed" />} />
            <Route path="loading-page" element={<Loading />}></Route>
            <Route path="bookmark" element={<Bookmark />}></Route>
            <Route path="explore" element={<Explore />}></Route>
            <Route path="notifications" element={<Notifications />}></Route>
            <Route path="messages" element={<Message />}></Route>
            <Route path="more" element={<More />}></Route>
            <Route path="feed" element={<Feed />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="list" element={<List />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
