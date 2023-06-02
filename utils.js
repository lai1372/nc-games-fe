import axios from "axios";

const gamesApi = axios.create({
  baseURL: `https://nc-games-600f.onrender.com/api`,
});

const fetchReviews = () => {
  return gamesApi.get("/reviews").then((reviews) => {
    return reviews.data;
  });
};

const fetchUsers = () => {
  return gamesApi.get("/users").then((users) => {
    return users.data;
  });
};

const fetchReviewsById = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((review) => {
    return review.data;
  });
};

const fetchCommentsByReviewId = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then((comments) => {
    return comments.data;
  });
};

const patchReview = (review_id) => {
  const patchBody = { inc_votes: 1 };
  return gamesApi.patch(`/reviews/${review_id}`, patchBody).then((response) => {
    return response;
  });
};

const patchReviewDownVote = (review_id) => {
  const patchBody = { inc_votes: -1 };
  return gamesApi.patch(`/reviews/${review_id}`, patchBody).then((response) => {
    return response;
  });
};

const postComment = (review_id, body) => {
  return gamesApi
    .post(`/reviews/${review_id}/comments`, {
      username: body.username,
      body: body.body,
    })
    .then((response) => {
      return response;
    });
};

const fetchReviewsByCategory = (category) => {
  return gamesApi.get(`/reviews?category=${category}`).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};

const fetchCategories = () => {
  return gamesApi.get("/categories").then((response) => {
    return response.data.categories;
  });
};

export {
  fetchReviews,
  fetchReviewsById,
  fetchCommentsByReviewId,
  patchReview,
  patchReviewDownVote,
  postComment,
  fetchUsers,
  fetchReviewsByCategory,
  fetchCategories,
};
