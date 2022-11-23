import "./App.css";
import LoginPage from "./TodoApp/LoginPage/LoginPage";
import ListPage from "./TodoApp/List Page/ListPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import JustTodo from "./components/JustTodo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login/register" element={<LoginPage type={"signup"} />} />
        <Route path="/login" element={<LoginPage type={""} />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:id" element={<JustTodo />} />
        <Route path="/" element={<Navigate to="/login" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
