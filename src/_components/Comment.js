import React from 'react';
import { CommentFooter } from './CommentFooter'

// Container component for the Front End Assessment
export function Comment(props) {
    return (
        /* Comment loads text pass to it + the CommentFooter Component (which is name and date) */
        <div className="comment">
            {props.commentText}
            <CommentFooter name={props.name} time={props.time} />
        </div>
    );
}