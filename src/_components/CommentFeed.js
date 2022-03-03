import React, {useContext, useEffect, useState, useRef} from 'react';
import { Comment } from './Comment'
import { SocketContext } from '../contexts/SocketContext'

// Container component for the Front End Assessment
export function CommentFeed(props) {
    const [comments, setComments] = useState([])
    const socket = useContext(SocketContext);
    const commentsPointer = useRef(comments)

    const commentHandler = (commentPayload, currentComments, setComments) => {
        if (commentPayload) {
            //debugger;
        }
        setComments(
            currentComments.concat(commentPayload)
        )
    }

    useEffect(() => {
        commentsPointer.current = comments
    })
    useEffect(() => {
        const handler = (commentPayload) => {
            commentHandler(commentPayload, commentsPointer.current, setComments)
        }
        socket.on('loadExistingComments', handler)
        return () => {
            socket.off('loadExistingComments', handler)
        }
    }, [])

    return (
        <div className="commentFeed">
            <ul>
                {comments.map(function(comment) {
                    //debugger;
                    return <Comment key={comment['id']} name={comment['name']} comment={comment['message']} time={comment['created']} />;
                })}
            </ul>
        </div>
    );
}