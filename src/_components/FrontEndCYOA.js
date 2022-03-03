import React, { useContext, useEffect, useCallback, useState } from 'react';
import { CommentForm } from './CommentForm'
import { CommentFeed } from  './CommentFeed'
import { SocketContext } from '../contexts/SocketContext'
import './_css/FrontEndCYOA.css'

// Container component for the Front End Assessment
export function FrontEndCYOA(props) {
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.emit('getExistingComments')
    }, [])
    return (
        <div className="FrontEndCYOA">
            <CommentForm />
            <CommentFeed />
        </div>
    );
}