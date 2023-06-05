import { useState, useEffect } from "react";
import { fetchCategories, fetchReviewsByCategory } from "../../utils";
import { Link } from "react-router-dom";

const Categories = ({ setReviews }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredReviews, setFilteredReviews] = [];

  useEffect(() => {
    fetchCategories()
      .then((reviewsByCat) => {
        setCategories(reviewsByCat);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [selectedCategory]);

  const searchByCategory = (event) => {
    setIsLoading(true);
    setSelectedCategory(event.target.value);
    fetchReviewsByCategory(event.target.value).then((reviews) => {
      setIsLoading(false);
      if (reviews.filtered_reviews) {
        setFilteredReviews(reviews.filtered_reviews);
      }
      // const categoryQuery = searchParams.get('category')
      // const newParams = new URLSearchParams(searchParams)
      // newParams.set('category', event.target.value)
      // setSearchParams(newParams)
    });
  };

  const formatter = (category) => {
    category = category.replace(/-/g, " ");
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <>
      {categories.map((category) => {
        return (
          <Link
            key={category.slug}
            className="categories"
            to={`/${category.slug}`}
          >
            {formatter(category.slug)}
          </Link>
        );
      })}
    </>
  );
};

export default Categories;
