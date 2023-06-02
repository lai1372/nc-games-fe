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
    .catch((err) => {});
};

const fetchUsers = () => {
  return gamesApi
  .get("/users")
  .then((users)=>{
    return users.data
  })
}

const fetchReviewsById = (review_id) => {
  return gamesApi
    .get(`/reviews/${review_id}`)
    .then((review) => {
      return review.data;
    })
    .catch((err) => {
      console.dir(err.response);
    });
};

const fetchCommentsByReviewId = (review_id) => {
  return gamesApi
    .get(`/reviews/${review_id}/comments`)
    .then((comments) => {
      return comments.data;
    })
    .catch((err) => {
      return err;
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
    .post(`/reviews/${review_id}/comments`, {username: body.username, body: body.body})
    .then((response) => {
      return response;
    });
};

export {
  fetchReviews,
  fetchReviewsById,
  fetchCommentsByReviewId,
  patchReview,
  patchReviewDownVote,
  postComment,
  fetchUsers
};
