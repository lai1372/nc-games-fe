import axios from "axios";

const gamesApi = axios.create({
  baseURL: `https://nc-games-600f.onrender.com/api`,
});

const fetchReviews = () => {
  return gamesApi
    .get("/reviews")
    .then((reviews) => {
      return reviews.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchReviewsById = (review_id) => {
  return gamesApi
    .get(`/reviews/${review_id}`)
    .then((review) => {
      return review.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchCommentsByReviewId = (review_id) => {
  return gamesApi
    .get(`/reviews/${review_id}/comments`)
    .then((comments) => {
      return comments.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { fetchReviews, fetchReviewsById, fetchCommentsByReviewId };
