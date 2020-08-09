import React from 'react';
import classes from './filter.css';
import filtervars from '../../../models/filtervars';
import ordering from '../../../models/ordering';

const filter = (props) => <div className={classes.Filter}>
    <label>Filter by</label>
    <select onChange={(e) => props.onFilter(e.target.value)}>
        <option value={filtervars.none}></option>
        <option value={filtervars.complated}>Complated</option>
        <option value={filtervars.creationDate}>Creation date</option>
        <option value={filtervars.author}>Author</option>
    </select>
    <label>Order</label>
    <select onChange={(e) => props.onOrder(e.target.value)}>
        <option value={ordering.asc}>Asc</option>
        <option value={ordering.desc}>Desc</option>
    </select>
</div>

export default filter;