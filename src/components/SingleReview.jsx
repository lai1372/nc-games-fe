import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../utils";
import Comments from "./Comments";
import UpVotes from "./UpVotes";

const SingleReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { review_id } = useParams();
  useEffect(() => {
    fetchReviewsById(review_id)
      .then((review) => {
        setReview(review.review);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [review_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="single-review">
      <h2>{review.title}</h2>
      <img
        className="single-review-image"
        src={review.review_img_url}
        alt={`Review for ${review.title}`}
      />
      <h3>Review by {review.owner}</h3>
      <h4>Category: {review.category}</h4>
      <p>{review.review_body}</p>
      <UpVotes review_id={review.review_id} review_votes={review.votes} />
      <Comments review_id={review_id} />
    </section>
  );
};

export default SingleReview;
