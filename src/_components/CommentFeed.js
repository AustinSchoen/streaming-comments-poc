import { useContext, useEffect, useState, useRef } from 'react';
import { Comment } from './Comment'
import { SocketContext } from '../contexts/SocketContext'

// Container component for the Front End Assessment
export function CommentFeed(props) {
    const [comments, setComments] = useState([])
    const socket = useContext(SocketContext);
    const commentsPointer = useRef(comments)

    const commentHandler = (commentPayload) => {
        setComments(commentPayload)
    }

    // Credit: https://stackoverflow.com/questions/54824036/useeffect-hook-with-socket-io-state-is-not-persistent-in-socket-handlers
    useEffect(() => {
        commentsPointer.current = comments
    })

    useEffect(() => {
        socket.on('newComment', () => {
            socket.emit('getExistingComments')
        })

        return () => socket.off('newComment')
    })

    // Receive comments & handle state change
    useEffect(() => {
        const handler = (commentPayload) => {
            commentHandler(commentPayload)
        }
        socket.on('loadExistingComments', handler)
        return () => {
            socket.off('loadExistingComments', handler)
        }
    })

    return (
        <div className="commentFeed">
            <ul>
                {comments.map(function(comment) {
                    return <Comment key={comment['id']} name={comment['name']} comment={comment['message']} time={comment['created']} />;
                })}
            </ul>
        </div>
    );
}