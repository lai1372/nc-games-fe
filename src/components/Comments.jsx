import { fetchCommentsByReviewId } from "../../utils";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";
import { deleteComment } from "../../utils";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errormsg, seterrormsg] = useState(null);
  const [newUsername, setNewUsername] = useState("grumpy19");

  useEffect(() => {
    fetchCommentsByReviewId(review_id)
      .then((comments) => {
        setComments(comments.comments);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!comments.length) {
    return (
      <>
        <p className="single-comment">No comments found for this review!</p>
        <AddComment
          review_id={review_id}
          setComments={setComments}
          newUsername={newUsername}
        />
      </>
    );
  }
  const dateConverter = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const deleteCom = (id, author, comment) => {
    if (author === newUsername) {
      setComments((currentComments) =>
        currentComments.filter((comment) => comment.comment_id !== id)
      );
      deleteComment(id).then(() => {});
      seterrormsg(null);
    } else {
      seterrormsg("Oops! You can't delete this comment");
    }
  };

  return (
    <section className="comments-section">
      <h2>Comments</h2>
      {comments.map((comment) => {
        return (
          <article key={comment.comment_id} className="single-comment">
            <p>Written by: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Post date: {dateConverter(comment.created_at)}</p>
            <button
              onClick={() =>
                deleteCom(comment.comment_id, comment.author, comment)
              }
              className="delete-comment"
            >
              🗑️
            </button>
          </article>
        );
      })}
      <p>{errormsg}</p>
      <AddComment
        review_id={review_id}
        setComments={setComments}
        newUsername={newUsername}
      />
    </section>
  );
};

export default Comments;
