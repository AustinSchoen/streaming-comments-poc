import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { CommentForm } from './CommentForm'
import { CommentFeed } from  './CommentFeed'
import { SocketContext } from '../contexts/SocketContext'
import { Container, Row, Col, } from "react-bootstrap"
import { gsap } from 'gsap'
import './_css/Container.css'

// Container component
export function AppContainer(props) {
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.emit('getExistingComments')
    }, [])

    const bannerRef = useRef(null);
    const logoRef = useRef(null)
    const tlRef = useRef(null);

    useLayoutEffect(() => {
        tlRef.current = gsap.timeline()
        tlRef.current.from(bannerRef.current, {x: -200, opacity: 0})
        tlRef.current.to(bannerRef.current, {x:0, opacity: 1})
        tlRef.current.to(logoRef.current, {
            repeat: -1,
            duration: .6,
            keyframes: {
                backgroundPositionX: [
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                    "-=150px",
                ],
                ease: "none",
                easeEach: "steps(1)"
            }
        })
    }, [])

    return (
       <Container className="mt-30">
           <Row id="banner" ref={bannerRef} className="align-items-center">
               <Col className="align-middle">
                   <div id="tagline" className="text-center display-1 fst-italic">
                       <div ref={logoRef} id="logo"></div>
                       MegaChat
                   </div>
               </Col>
           </Row>
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