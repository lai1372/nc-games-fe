import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Users from "./components/Users";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
