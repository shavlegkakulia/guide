import React from 'react';
import Task from './task/task';

import classes from './tasks.css';

const tasks = (props) => {

    return ( 
        <div className={classes.Tasks} >
        <input type="button" value="add" onClick={() => props.onShowModal(true)} />
            {
                props.tasks.map(task => {
                    return <Task key={task.id} data={task} onStartEdit={props.onStartEdit} />
                })
            }
        </div>
    );

}

export default tasks;