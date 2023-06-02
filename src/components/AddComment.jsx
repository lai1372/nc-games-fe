import { useState } from "react";
import { postComment } from "../../utils";

const AddComment = ({ review_id, setComments }) => {
  const [newUsername, setNewUsername] = useState("grumpy19");
  const [newComment, setNewComment] = useState("");
  const [errorMsgWhiteSpace, setErrorMsgWhiteSpace] = useState(null);
  const [errorMsgCharacter, setErrorMsgCharacter] = useState(null);
  const [postError, setPostError] = useState(null);

  const [buttonDisable, setButtonDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentToPost = {
      username: newUsername,
      body: newComment,
    };

    postComment(review_id, commentToPost)
      .then((response) => {
        setPostError(null);
        setComments((currentComments) => {
          return [...currentComments, response.data.comment];
        });
      })
      .catch(() => {
        setPostError("Oops! Unable to post comment");
      });

    setNewComment("");
  };

  const handleCommentValidation = (event) => {
    const regex1 = /^\s*$/;
    const regex2 = /.{10,}/gi;

    if (regex1.test(event.target.value) === true) {
      setErrorMsgWhiteSpace("Please type something!");
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
      setErrorMsgWhiteSpace(null);
    }
    if (regex2.test(event.target.value) === false) {
      setErrorMsgCharacter("Please type more than 30 characters");
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
      setErrorMsgCharacter(null);
    }
  };
  return (
    <section className="add-comment">
      <h2>Comment section</h2>
      <p>{errorMsgCharacter}</p>
      <p>{errorMsgWhiteSpace}</p>
      <p>{postError}</p>
      <form onSubmit={handleSubmit} className="form">
        <p>
          Logged in as <strong>{newUsername}</strong>
        </p>
        <label htmlFor="userComment">Comment: </label>
        <textarea
          id="userComment"
          rows="4"
          cols="50"
          name="comment"
          value={newComment}
          onChange={(event) => {
            setNewComment(event.target.value);
          }}
          onBlur={handleCommentValidation}
        ></textarea>

        <button type="submit" disabled={buttonDisable}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddComment;
