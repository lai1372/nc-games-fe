import { useEffect, useState } from "react";
import {
  fetchReviews,
  fetchCategories,
  fetchReviewsByCategory,
} from "../../utils";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("")


  useEffect(() => {
    fetchCategories()
      .then((reviewsByCat) => {
        setCategories(reviewsByCat);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    fetchReviews()
      .then((reviews) => {
        setReviews(reviews.reviews);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
// console.log("hi")
  const searchByCategory = (event) => {
    setSelectedCategory(event.target.value)
    setIsLoading(true)
    fetchReviewsByCategory(event.target.value).then((reviews) => {
      setIsLoading(false)
      if (reviews.filtered_reviews){
        setReviews(reviews.filtered_reviews);
      }
      // const categoryQuery = searchParams.get('category')
      // const newParams = new URLSearchParams(searchParams)
      // newParams.set('category', event.target.value)
      // setSearchParams(newParams)
    });
  };

  const clearFilter = () => {
    fetchReviews().then((reviews) => {
      setReviews(reviews.reviews);
    });
  };

  const formatter = (category) => {
    category = category.replace(/-/g, ' ');
  return category.charAt(0).toUpperCase() + category.slice(1);
}
  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="home">
      <p>Select category</p>
      <button onClick={clearFilter}>All Reviews</button>
      {categories.map((category) => {
        return (
          <button
            onClick={searchByCategory}
            key={category.slug}
            value={category.slug}
          >
            {formatter(category.slug)}
          </button>
        );
      })}
      {console.log(reviews)}
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
