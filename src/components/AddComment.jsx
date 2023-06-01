import { useState } from "react";
import { fetchUsers, postComment } from "../../utils";

const AddComment = ({ review_id, setComments }) => {
  const [newUsername, setNewUsername] = useState("grumpy19");
  const [newComment, setNewComment] = useState("");
  const [errorMsgWhiteSpace, setErrorMsgWhiteSpace] = useState(null);
  const [errorMsgCharacter, setErrorMsgCharacter] = useState(null);
  const [characterLength, setCharacterLength] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const commentToPost = {
      username: newUsername,
      body: newComment,
    };

    postComment(review_id, commentToPost)
      .then((response) => {
        setComments((currentComments) => {
          return [response.data.comment, ...currentComments];
        });
      })
      .catch((err) => console.log(err));

    setNewUsername("");
    setNewComment("");
  };

  const handleCommentValidation = (event) => {
    const regex1 = /^\s*$/;
    const regex2 = /.{30,}/gi;

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
      setCharacterLength(event.target.value.length);
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
