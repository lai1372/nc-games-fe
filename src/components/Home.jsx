import { useEffect, useState } from "react";
import {
  fetchReviews,
} from "../../utils";
import { useSearchParams } from "react-router-dom";
import Categories from "./Categories";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    fetchReviews()
      .then((reviews) => {
        setReviews(reviews.reviews);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="home">
      <Categories setReviews={setReviews}/>
      <h3>Reviews ({reviews.length})</h3>
      {reviews.map((review) => {
        return (
          <section key={review.review_id} className="review-list">
            <p>Title: {review.title}</p>
            <p> Category: {review.category}</p>
            <p> By: {review.owner}</p>
            <a href={`/reviews/${review.review_id}`}>Read full review </a>
          </section>
        );
      })}
    </section>
  );
};

export default Home;
