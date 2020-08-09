import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Step from './step/step';
import classes from './steps.css';

const SortableItem = SortableElement(props => <Step key={props.id} id={props.id} onSetStep={props.onSetStep} onKeyUp={props.onKeyUp} text={props.text} />);

const SortableList = SortableContainer((props) => {
    return (
      <div>
        {props.steps.map((step, index) => (
          <SortableItem key={step.id} id={step.id} text={step.text} index={index} value={step} onSetStep={props.onSetStep} onKeyUp={props.onKeyUp} />
        ))}
      </div>
    );
  });

const steps = (props) => {

    return (
        <div className={classes.StepsBox}>
            <SortableList
                steps={props.steps}
                onSetStep={props.onSetStep}
                onKeyUp={props.onKeyUp} 
                onSortEnd={props.onSortEnd}
                axis="y" 
                lockAxis="y" />
            <div className={classes.Add} onClick={props.onAddStep} >+</div>
        </div>
    )
}

export default steps;