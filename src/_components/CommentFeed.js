import React from 'react';
import { Comment } from 'Comment'

// Container component for the Front End Assessment
export function CommentFeed(props) {
    /* renders multiple comments based on results from /getComments API */
    /* real time fade in when comments appear? */
    return (
        <div className="commentFeed">
            <ul>
                {props.comments.map(function(comment) {
                    return <Comment name={comment['name']} comment={comment['comment']} time={comment['time']} />;
                })}
            </ul>
        </div>
    );
}