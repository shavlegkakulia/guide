import React from 'react';
import classes from './modal.css';

import BackDrop from './backdrop/backdrop';

const modal = (props) => {
    return (
        props.show ?
            <div className={classes.Modal}>
                <BackDrop onClose={props.onCloseModal} show={props.show} />
                <div className={classes.ModalContent} >
                    <div className={classes.ModalHeader}>
                        <span>{props.title}</span>
                        <button onClick={props.onCloseModal}>x</button>
                    </div>
                    <div className={classes.ModalBody} >
                        {props.children}
                    </div>
                </div>
            </div> : null
    )
}

export default modal;