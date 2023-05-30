import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Users from "./components/Users";
import SingleReview from "./components/SingleReview";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Users />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
      </Routes>
    </>
  );
}

export default App;
