import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Users from "./components/Users";
import SingleReview from "./components/SingleReview";
import FilteredReviews from "./components/FilteredReviews";

function App() {
  return (
    <>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reviews/:review_id" element={<SingleReview />} />
        <Route path="/:category" element={<FilteredReviews />} />

      </Routes>
    </>
  );
}

export default App;
