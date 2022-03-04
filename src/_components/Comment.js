import React from 'react';
import { CommentFooter } from './CommentFooter'
import Markdown from 'react-remarkable'
import './_css/Comment.css'

// Container component for the Front End Assessment
export function Comment({name, comment, time}) {
    return (
        /* Comment loads text pass to it + the CommentFooter Component (which is name and date) */
        <div className="comment">
            <Markdown source={comment} />
            <CommentFooter name={name} time={time} />
        </div>
    );
}