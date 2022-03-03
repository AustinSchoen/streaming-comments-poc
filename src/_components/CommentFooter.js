import React from 'react';

// Container component for the Front End Assessment
export function CommentFooter({name, time}) {
    return(
        <div className="commentFooter">{name} - Posted: {time}</div>
    )
}