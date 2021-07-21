import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../Hooks/httpHook';
import { getComments } from '../../lib';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {quoteId} = params;
  const { sendRequest , status, data: loadedComments} = useHttp(getComments);


  //for page reload when we add a new comment
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  },[quoteId, sendRequest])

  useEffect(() => {
    sendRequest(quoteId);
  },[sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  let comments;

  if(status ==="pending") {
    comments = <div className="centered"> <LoadingSpinner/> </div>
  }
  if(status === "completed" && loadedComments) {
    comments = <CommentsList comments={loadedComments}/>
  }

  if(status === "completed" && (!loadedComments || loadedComments.length === 0) ) {
    comments = <p className="centered">No comments are added yet..</p>
  }


  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm  quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
