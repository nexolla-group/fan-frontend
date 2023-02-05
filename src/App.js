import UserHome from "./pages/userHome/UserHome";

import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Home from "./Home/pages/HomePage";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Messenger from "./pages/messenger/Messenger";

import HomePage from "./Home/pages/HomePage";
import {
  AdminDashboard,
  Feaxtures,
  Matches,
  Users,
  Posts,
  Tasks,
} from "./admin";
import ProtectedRoute from "./controllers/protected-route";
import UnProtectedRoute from "./controllers/un-protected-route";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { updateGroupMessages } from "./actions/messages";
import Logout from "./pages/logout";
import { ToastContainer } from "react-toastify";
import Group from "./admin/components/groups/Group";
import AvairableGroups from "./pages/messenger/AvairableGroups/AvairableGroups";
import Transactions from "./admin/components/transactions/Transactions";
import Contributions from "./pages/messenger/contributioins/Contributions";
import UserDashboard from "./pages/messenger/userDashboard/UserDashboard";
import ChatBox from "./pages/messenger/Chatbox/ChatBox";
import UserProfile from "./pages/UserProfiles/UserProfile";
import ContributionsProgress from "./admin/components/contributions/ContributionsProgress";
import UserTransactions from "./admin/components/transactions/UserTransactions";
import PrintUserTransactions from "./admin/components/transactions/PrintUserTransactions";
import MatchFixtures from "./admin/components/MatchFixtures/MatchFixtures";
import Results from "./admin/components/Results/Results";

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);
  //socket connection
  const socket = io(process.env.REACT_APP_SOCKET_SERVER);
  socket.on("connect", () => {
    console.log("connected to socket server");
  });
  // socket.emit("addUser", "6374b6604dcda6df7fe85af8");
  socket.on("updatedMessages", (data) => {
    console.log("updated messages ", data);
    dispatch(updateGroupMessages(data));
  });
  socket.on("disconnect", () => {
    console.log("disconnected from socket server");
  });
  useEffect(() => {
    socket.emit("addUser", id);
  }, [id]);
  //socket connection

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <UnProtectedRoute>
              <HomePage />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnProtectedRoute>
              <Login />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnProtectedRoute>
              <Register />
            </UnProtectedRoute>
          }
        />
        <Route
          path="/messenger"
          element={
            <ProtectedRoute>
              <Messenger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/printuserTransactions"
          element={
            <ProtectedRoute>
              <PrintUserTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbox"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contributions/:groupId"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userHome"
          element={
            <ProtectedRoute>
              <Contributions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <AvairableGroups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userTransactions"
          element={
            <ProtectedRoute>
              <UserTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <AvairableGroups />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute>
              <Transactions
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/posts"
          element={
            <ProtectedRoute>
              <Posts
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Fixtures"
          element={
            <ProtectedRoute>
              <MatchFixtures
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/groups"
          element={
            <ProtectedRoute>
              <Group
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/progress"
          element={
            <ProtectedRoute>
              <ContributionsProgress />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
