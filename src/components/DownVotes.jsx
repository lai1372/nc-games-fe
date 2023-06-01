import { useState } from "react";
import { patchReview } from "../../utils.js";

const DownVotes = ({ review_id, review_votes }) => {
  const [votes, setVotes] = useState(0);
  
  const decreaseVotes = () => {
    setVotes((currentVotes) => {
      return currentVotes - 1;
    });
    
    patchReview(review_id)
    .catch(() => {
        setVotes((currentVotes) => {
         return currentVotes + 1;
        });
    })
};

  const isDisabled = votes > 0;

  return (
    <>
      <button onClick={decreaseVotes} disabled={isDisabled}>
        {review_votes + votes}
        <span aria-label="Down vote a review"> 👎🏽</span>
      </button>
    </>
  );
};

export default DownVotes;
