import React, { createRef } from 'react';
import Pdf from "react-to-pdf";
import classes from './exportpdf.css';

const exportpdf = (props) => {
    const ref = createRef();

    return (
        <div className={classes.ExportPdf} >
            <div ref={ref} >
                {props.children}
            </div>
            <hr />
            <Pdf targetRef={ref} filename="data.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
            </Pdf>
        </div>
    )
}

export default exportpdf;