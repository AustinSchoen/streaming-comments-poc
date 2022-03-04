import { useContext, useEffect } from 'react';
import { CommentForm } from './CommentForm'
import { CommentFeed } from  './CommentFeed'
import { SocketContext } from '../contexts/SocketContext'
import { Container, Row, Col } from "react-bootstrap";

// Container component for the Front End Assessment
export function FrontEndCYOA(props) {
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.emit('getExistingComments')
    }, [])
    return (
       <Container className="mt-30">
           <Row>
               <Col/>
               <Col xs={8}>
                   <CommentForm />
               </Col>
               <Col />
           </Row>
           <br/>
           <Row>
               <Col/>
               <Col xs={10}>
                <CommentFeed />
               </Col>
               <Col />
           </Row>
        </Container>
    );
}