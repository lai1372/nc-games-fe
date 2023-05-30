import { useEffect, useState } from "react";
import { fetchReviews } from "../../utils";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setReviews(reviews.reviews);
    });
  }, [reviews]);

  return (
    <section className="home">
      <h2>Reviews</h2>
      {reviews.map((review) => {
        return (
          <ul>
            <li>Title: {review.title}</li>
            <li> Category: {review.category}</li>
            <li> By: {review.owner}</li>
            <button>Read full review</button>
          </ul>
        );
      })}
    </section>
  );
};

export default Home;
