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

export { fetchReviews };
