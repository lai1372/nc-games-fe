import { useState } from "react";
import { patchReview, patchReviewDownVote } from "../../utils.js";

const UpVotes = ({ review_id, review_votes }) => {
  const [votes, setVotes] = useState(0);
  const [thumbsUp, setThumbsUp] = useState(false)
  const [thumbsDown, setThumbsDown] = useState(false)


  const increaseVotes = () => {
    setVotes((currentVotes) => {
      return currentVotes + 1;
    });

    patchReview(review_id).catch(() => {
      setVotes((currentVotes) => {
        return currentVotes - 1;
      });
    });
    setThumbsUp(true)
    setThumbsDown(false)
  };

  const decreaseVotes = () => {
    setVotes((currentVotes) => {
      return currentVotes - 1;
    });

    patchReviewDownVote(review_id).catch(() => {
      setVotes((currentVotes) => {
        return currentVotes + 1;
      });
    });
    setThumbsDown(true)
    setThumbsUp(false)
  };

  const clearVotes = () =>{
    setThumbsDown(false)
    setThumbsUp(false)
  }

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
      <button onClick={clearVotes}>
        <span aria-label="Down vote this review"> Clear votes</span>
      </button>
    </>
  );
};

export default UpVotes;
