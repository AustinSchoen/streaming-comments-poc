import { useContext } from 'react';
import { useInput } from './_hooks/InputHook';
import { SocketContext } from '../contexts/SocketContext'
import { Form, Button, ButtonGroup } from 'react-bootstrap'

// Container component for the comment form
export function CommentForm(props) {
    /* Submit a comment to the /addComment API */

    // Credit: https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
    const { value:name, bind:bindName, reset:resetName } = useInput('')
    const { value:comment, bind:bindComment, reset:resetComment } = useInput('')

    const socket = useContext(SocketContext)

    const handleSubmit = (event) => {
        event.preventDefault();
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
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCommenter">
                <Form.Label className="m-3">Name</Form.Label>
                <Form.Control as="input" placeholder="Freddie" {...bindName}/>
                <Form.Label className="m-3">Comment</Form.Label>
                <Form.Control as="textarea" placeholder="My Comment" rows={3}  {...bindComment}/>
            </Form.Group>
            <br/>
                <Button type="submit" variant="primary" className="m-2">Submit</Button>
                <Button type="button" variant="danger" className="m-2" onClick={handleDelete}>Delete</Button>
        </Form>
    );
}