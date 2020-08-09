import React from 'react';
import Search from '../search/search';
import Filter from '../filter/filter';
import classes from './header.css';

const header = (props) => {
    return(
        <div className={classes.Header}>
           <Search onSearchTask = {props.onSearchTask} />
           <Filter onFilter = {props.onFilter} onOrder={props.onOrder} />
        </div>
    )
}

export default header;