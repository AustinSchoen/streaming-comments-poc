import React from 'react';

// Container component for the Front End Assessment
export function CommentFooter({name, time}) {
    return(
        <div className="commentFooter text-end fs-5 fst-italic">{name} - Posted: {time}</div>
    )
}