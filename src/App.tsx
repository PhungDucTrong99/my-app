import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { todoListSelector } from "./stores/selector";
import NotFound from "./components/NotFoundPage";
import LoginPage from "./components/Login";
import HomePage from "./components/Home";
import QuestionNew from "./components/Questions";
import AskLayout from "./components/UserAsk";
import UserAskDetail from "./components/DetailUserAsk";
import LeaderboardPage from "./components/LeaderBoardPage";

function App() {
  const listUser = useSelector(todoListSelector);

  const userList = Object.values(listUser);
  const hasActiveUser = userList.some((user: any) => user.status === "active");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={hasActiveUser ? <HomePage /> : <LoginPage />}
        />
        <Route path="/leaderboard" element={<LeaderboardPage />}></Route>
        <Route path="/add" element={<QuestionNew />} />
        <Route path="/card" element={<AskLayout />} />
        <Route
          path="/question/:id/:questionId"
          element={hasActiveUser ? <UserAskDetail /> : <LoginPage />}
        />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
