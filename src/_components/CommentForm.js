import { useContext } from 'react';
import { useInput } from './_hooks/InputHook';
import { SocketContext } from '../contexts/SocketContext'

// Container component for the comment form
export function CommentForm(props) {
    /* Submit a comment to the /addComment API */

    // Credit: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
    const { value:name, bind:bindName, reset:resetName } = useInput('Enter name')
    const { value:comment, bind:bindComment, reset:resetComment } = useInput('Enter comment')

    const socket = useContext(SocketContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Submitting ${comment} for ${name}`)
        socket.emit('addComment',
            JSON.stringify({
                'name': name,
                'comment': comment,
                'time': Date.now()
            }))
        resetComment()
        socket.emit('getExistingComments')
    }

    const handleDelete = () => {
        socket.emit('deleteComments')
    }

    return (
        <div className="CommentFormContainer">
            <form onSubmit={handleSubmit} className="CommentForm">
                <div id="nameInput">
                    <label>
                        <h6>Name:</h6>
                        <input type="text" className="inputName" {...bindName} />
                    </label>
                </div>
                <div id="commentInput">
                    <label>
                        <h6>Comment:</h6>
                        <input type="textarea" className="inputComment" {...bindComment} />
                    </label>
                </div>
                <div>
                    <button type="submit" value="Submit" className="submitButton">Submit</button>
                </div>
            </form>
            <div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}