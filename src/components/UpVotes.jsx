import { useState } from "react";
import { patchReview, patchReviewDownVote } from "../../utils.js";

const UpVotes = ({ review_id, review_votes }) => {
  const [votes, setVotes] = useState(0);
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const increaseVotes = () => {
    setVotes((currentVotes) => {
      setErrorMsg(null);
      return currentVotes + 1;
    });

    patchReview(review_id).catch(() => {
      setVotes((currentVotes) => {
        setErrorMsg("Oops! Unable to add vote");
        return currentVotes - 1;
      });
    });
    setThumbsUp(true);
    setThumbsDown(false);
  };

  const decreaseVotes = () => {
    setVotes((currentVotes) => {
      setErrorMsg(null);
      return currentVotes - 1;
    });

    patchReviewDownVote(review_id).catch(() => {
      setVotes((currentVotes) => {
        setErrorMsg("Oops! Unable to add vote");
        return currentVotes + 1;
      });
    });
    setThumbsDown(true);
    setThumbsUp(false);
  };

  return (
    <>
      <p>Votes: {votes + review_votes}</p>
      <button onClick={increaseVotes} disabled={thumbsUp}>
        <span aria-label="Up vote this review"> 👍🏽</span>
      </button>
      <button onClick={decreaseVotes} disabled={thumbsDown}>
        <span aria-label="Down vote this review"> 👎🏽</span>
      </button>
      <br></br>
      <>{errorMsg}</>
    </>
  );
};

export default UpVotes;
