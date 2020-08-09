import React, { Fragment } from 'react';

const search = (props) => <Fragment>
    <input type="test" placeholder="Search" onChange={(e) => props.onSearchTask(e.target.value)} />
</Fragment>

export default search;