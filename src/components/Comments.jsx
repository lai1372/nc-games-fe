import { fetchCommentsByReviewId } from "../../utils";
import { useState, useEffect } from "react";
 

const Comments = ({review_id}) => {
  const [comments, setComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommentsByReviewId(review_id)
      .then((comments) => {
        console.dir(comments.comments)
        setComments(comments.comments);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [comments]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="comments-section">
      <h2>Comments</h2>
      {comments.map((comment)=>{
        return <p className="single-comment">
          <p>Written by: {comment.author}</p>
          <p>Comment: {comment.body}</p>
          <p>Votes: {comment.votes}</p>
          <p>Post date: {comment.created_at}</p>
        </p>
      })}
    </section>
  );
};

export default Comments;
