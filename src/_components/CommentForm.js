import React from 'react';
import { useInput } from './_hooks/InputHook';

// Container component for the comment form
export function CommentForm(props) {
    /* Submit a comment to the /addComment API */

    const { value:name, bind:bindName, reset:resetName } = useInput('Enter name')
    const { value:comment, bind:bindComment, reset:resetComment } = useInput('Enter comment')

    const handleSubmit = (event) => {
        // TODO: handle API call... useEffect here?
        event.preventDefault();
        alert(`Submitting Comment for ${name}`)
        resetComment()
    }

    return (
        <div className="CommentFormContainer">
            <form onSubmit={handleSubmit} className="CommentForm">
                <label>
                    Name:
                    <input type="text" className="inputName" {...bindName} />
                </label>
                <label>
                     Comment:
                     <input type="textarea" className="inputComment" {...bindComment} />
                </label>
                <button type="submit" value="Submit" className="submitButton" />
            </form>
        </div>
    );
}