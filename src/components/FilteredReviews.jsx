import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsByCategory } from "../../utils";
import Categories from "./Categories";

const FilteredReviews = () => {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errormsg, seterrormsg] = useState(null)
  const { category } = useParams();

  useEffect(() => {
    fetchReviewsByCategory(category)
      .then((reviews) => {
        setFilteredReviews(reviews.filtered_reviews);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(()=>{
        seterrormsg("No reviews found in this category!")
      });
  }, [category]);

  return (
    <>
      <Categories />
      <section className="home">
        <h3>Reviews ({filteredReviews.length})</h3>
        {filteredReviews.map((review) => {
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
    </>
  );
};

export default FilteredReviews;
