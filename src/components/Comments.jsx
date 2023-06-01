import { fetchCommentsByReviewId } from "../../utils";
import { useState, useEffect } from "react";
import AddComment from "./AddComment";

const Comments = ({ review_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    return <p className="single-comment">No comments found for this review!</p>;
  }

  return (
    <section className="comments-section">
      <AddComment review_id={review_id} setComments={setComments} />
      <h2>Comments</h2>
      {comments.map((comment) => {
        return (
          <article key={comment.comment_id} className="single-comment">
            <p>Written by: {comment.author}</p>
            <p>Comment: {comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Post date: {comment.created_at}</p>
          </article>
        );
      })}
    </section>
  );
};

export default Comments;
