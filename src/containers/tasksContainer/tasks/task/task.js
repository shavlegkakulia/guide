import React from 'react';
import classes from './task.css';

const task = (props) => {
    const isComplatedStyle = {
        backgroundColor: props.data.complated ? 'green' : 'red',
        width: '10px',
        height: '10px',
        borderRadius: '50%'
    }
    
    return (
        <div className={classes.Task} onClick={() => props.onStartEdit(props.data)}>
            <div className={classes.Author} >{props.data.author}</div>
            <div className={classes.Footer} >
                <div style={isComplatedStyle}></div>
                <div className={classes.CreationDate}>{props.data.timestamp}</div>
            </div>
        </div>
    )
}

export default task;