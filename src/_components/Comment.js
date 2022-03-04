import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap'
import { CommentFooter } from './CommentFooter'
import Markdown from 'react-remarkable'


// Container component for the Front End Assessment
export function Comment({id, name, comment, time}) {
    const nodeRef = useRef();

    useLayoutEffect(() => {
        gsap.fromTo(nodeRef.current, {
            duration:1,
            x: -100,
            opacity: 0
        }, {
            duration:1,
            x: 0,
            opacity: 1,
        });
    }, [])

    return (
        /* Comment loads text pass to it + the CommentFooter Component (which is name and date) */
        <div ref={nodeRef} className="bg-light border p-4 comment" id={`id_${id}`}>
            <Markdown source={comment} />
            <CommentFooter name={name} time={time} />
        </div>
    );
}