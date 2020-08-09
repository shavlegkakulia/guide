import React from 'react';
import classes from './backdrop.css';

const modal = (props) => props.show ? <div onClick={props.onClose} className={classes.Backdrop} ></div> : null

export default modal;