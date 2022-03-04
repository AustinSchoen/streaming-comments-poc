import { useContext, useEffect, useState, useRef } from 'react';
import { Comment } from './Comment'
import { SocketContext } from '../contexts/SocketContext'
import { Stack } from 'react-bootstrap'
import { gsap } from 'gsap'

// Container component for the Front End Assessment
export function CommentFeed(props) {
    const [comments, setComments] = useState([])
    const socket = useContext(SocketContext);
    const commentsPointer = useRef(comments)

    const commentHandler = (commentPayload) => {
        setComments(commentPayload)

        // let fadeInTimeline = gsap.timeline()
        //
        // commentsPointer.current.map((cRef) => {
        //     fadeInTimeline.from(`#id_${cRef['id']}`, {duration: 3, x: 100, opacity: 0})
        // })
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
        <Stack gap={3}>
            {comments.map(function(comment) {
                return <Comment id={`id_${comment['id']}`} key={comment['id']} name={comment['name']} comment={comment['message']} time={comment['created']} />;
            })}
        </Stack>
    );
}