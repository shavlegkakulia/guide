import React, { useEffect, useRef } from 'react';
import classes from './step.css';

const Step = (props) => {

    const stepInput = useRef();

    useEffect(() => {
        stepInput.current.focus();
    }, [])

    return (
        <div className={classes.StepItem}>
            <div className={classes.DragArea} >
                <div></div>
                <div></div>
                <div></div>
            </div>
            <input type="text" ref={stepInput} onKeyUp={(e) => props.onKeyUp(e)} value={props.text} onChange={(e) => props.onSetStep(props.id, e.target.value)} />
        </div>
    )
}

export default Step;