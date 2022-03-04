import { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { CommentForm } from './CommentForm'
import { CommentFeed } from  './CommentFeed'
import { SocketContext } from '../contexts/SocketContext'
import { Container, Row, Col, Figure } from "react-bootstrap"
import { gsap } from 'gsap'
import freddie from './_img/mailchimp-freddie-icon-logo-black-and-white.png'
import freddieWink from './_img/mailchimp-freddie-icon-wink-logo-black-and-white.png'
import './_css/FrontEndCYOA.css'

// Container component for the Front End Assessment
export function FrontEndCYOA(props) {
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
        tlRef.current.fromTo(logoRef.current,
            {duration: 0.00, immediateRender: true,  attr: {src: freddie }},
            {duration: 0.01, immediateRender: true,  attr: {src: freddieWink }})
    }, [])

    return (
       <Container className="mt-30">
           <Row id="banner" ref={bannerRef} className="align-items-center">
               <Col className="align-middle">
                   <div id="tagline" className="text-center display-1 fst-italic">
                       <img ref={logoRef} id="logo" width={171} height={180} alt="Freddie"
                            src={freddie}/>
                       FreddieChat
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