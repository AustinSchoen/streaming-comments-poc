import React, { useContext, useEffect, useCallback, useState } from 'react';
import { CommentForm } from './CommentForm'
import { CommentFeed } from  './CommentFeed'
import { SocketContext } from '../api/socket-api'

// Container component for the Front End Assessment
export function FrontEndCYOA(props) {
    const [comments, setComments] = useState([])
    const socket = useContext(SocketContext);

    const collateExistingComments = useCallback(() => {
        //TODO: Make sure these are ordered based on timestamp

        }
    )

    useEffect(() => {
        socket.emit('getComments')
        socket.on('loadExistingComments', (commentPayload) => {
            collateExistingComments(commentPayload)
        })
    })

    return (
        <div className="FrontEndCYOA">
            <CommentForm />
            <CommentFeed />
        </div>
    );
}