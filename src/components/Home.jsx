import { useEffect, useState } from "react";
import { fetchReviews } from "../../utils";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then((reviews) => {
      setReviews(reviews.reviews);
    })
    .then(()=>{
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
          <ul className="review-list">
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
