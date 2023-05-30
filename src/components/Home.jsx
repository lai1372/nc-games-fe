import { useEffect, useState } from "react";
import { fetchReviews } from "../../utils";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews()
      .then((reviews) => {
        setReviews(reviews.reviews);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [reviews]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="home">
      <h2>All reviews ({reviews.length})</h2>
      {reviews.map((review) => {
        return (
          <p className="review-list">
            <p>Title: {review.title}</p>
            <p> Category: {review.category}</p>
            <p> By: {review.owner}</p>
            <a href={`/reviews/${review.review_id}`}>Read full review</a>
          </p>
        );
      })}
    </section>
  );
};

export default Home;
