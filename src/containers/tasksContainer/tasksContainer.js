import React, { Component } from 'react';
import Tasks from './tasks/tasks';
import Modal from '../../components/formcontrols/modal/modal';
import Header from './header/header';
import stateService from '../../services/stateService';
import { states } from '../../models/states';
import taskService from '../../services/tasksService';
import commonService from '../../services/commonService';
import classes from './tasksContainer.css';
import Pagination from '../../components/formcontrols/pagination/pagination';
import Steps from './steps/steps';
import filtervars from '../../models/filtervars';
import orderings from '../../models/ordering';
import ExportPdf from '../../components/exportPDF/exportpdf';
import ReactQuill from 'react-quill';
import arrayMove from 'array-move';

class TasksContainer extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        tasks: [],
        task: { title: '', description: '' },
        taskId: null,
        steps: [],
        complated: false,
        isFetching: false,
        showModal: false,
        showPdfModal: false,
        authUser: null,
        search: null,
        filter: { row: filtervars.none, order: orderings.asc },
        pageOfItems: [],
        editTask: null
    }

    changePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    closeModal = () => {
        this.setState(prevState => {
            return { showModal: !prevState.showModal, task: { title: '', description: '' }, steps: [], complated: false, taskId: null }
        });
    }

    closePdfModal = () => {
        this.setState(prevState => {
            return { showPdfModal: !prevState.showPdfModal }
        });
    }

    setDescription = (value) => {
        this.setState(prevState => {
            let task = { ...prevState.task };
            task.description = value;
            return {
                task
            }
        });
    }

    setTitle = (value) => {
        this.setState(prevState => {
            let task = { ...prevState.task };
            task.title = value;
            return {
                task: task
            }
        });
    }

    updateTasks = (data, id) => {

        this.setState(prevState => {
            let tasks = [...prevState.tasks];
            if (id) {
                let taskIndex = tasks.findIndex(task => task.id === id);
                tasks[taskIndex] = data;
            }
            else if (!id) {
                tasks.push(data);
            }


            return { tasks }
        }, () => {
            this.setState({ showModal: false, task: { title: '', description: '' }, steps: [], complated: false, taskId: null })
        })
    }

    saveTask = () => {
        const data = {
            id: this.state.taskId || commonService.guid(),
            author: this.state.authUser.username,
            complated: this.state.complated,
            details: { title: this.state.task.title, desc: this.state.task.description, steps: [...this.state.steps] },
            timestamp: new Date().toLocaleDateString()
        }

        taskService.saveData(data, this.state.taskId);


        this.updateTasks(data, this.state.taskId);
    }

    searchTask = (value) => {
        this.setState({ search: value });
    }

    filterTask = (value) => {
        this.setState(prevState => {
            let filter = { ...prevState.filter };
            filter.row = value;
            if (value == filtervars.none)
                filter.row = null;
            return { filter }
        });
    }

    orderTask = (value) => {
        this.setState(prevState => {
            let filter = { ...prevState.filter };
            filter.order = value;
            return { filter }
        });
    }

    componentDidMount() {
        if (!this.state.authUser) {
            let user = commonService.serializedata(stateService.getState(states.profileInfo).value);

            this.setState({ authUser: user });
        }

        let tasks = taskService.getTasks({});
        this.setState({ tasks })
    }

    addStep = () => {
        let maxCount = this.state.steps.length;

        let newSteps = {
            id: maxCount + 1,
            text: '',
            ordering: maxCount + 1
        }

        this.setState({ steps: [...this.state.steps, newSteps] });
    }

    setStep = (id, value) => {
        let steps = [...this.state.steps];
        let index = steps.findIndex(step => step.id === id);
        steps[index].text = value;

        this.setState({ steps: steps });
    }

    setComplate = () => {
        this.setState(prevState => {
            return {
                complated: !prevState.complated
            }
        });
    }

    keyUp = (e) => {
        e.preventDefault();

        if (e.keyCode === 13) {
            this.addStep();
        }
    }

    sortEnd = ({ oldIndex, newIndex }) => {

        if (this.reorderStarted) return;
        this.reorderStarted = true;

        let oldSteps = this.state.steps[oldIndex];
        oldSteps.ordering = newIndex;
        this.setState(prevState => ({ steps: arrayMove(prevState.steps, oldIndex, newIndex) }), () => this.reorderStarted = false);

    }

    startEdit = (task) => {
        this.setState(prevState => {
            let id = task.id;
            let steps = [...task.details.steps];
            let desc = task.details.desc;
            let title = task.details.title;
            let complated = task.complated;
            let taskData = { title: title, description: desc };

            return {
                steps,
                taskId: id,
                task: taskData,
                complated,
                showModal: true
            }
        });
    }

    render() {
        const toolbarOptions = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['image'],
                [{ 'color': [] }, { 'background': [] }],
            ]
        };

        let searchedTasks = null;
        if (this.state.search) {
            let tasks = [...this.state.pageOfItems];
            searchedTasks = tasks.filter(task =>
                task.id.toString().includes(this.state.search) ||
                task.author.toString().includes(this.state.search) ||
                task.details.title.toString().includes(this.state.search) ||
                task.details.desc.toString().includes(this.state.search) ||
                task.timestamp.toString().includes(this.state.search)
            )
        } else {
            searchedTasks = [...this.state.pageOfItems];
        }


        if (this.state.filter.row) {
            let tasks = [...searchedTasks];
            switch (Number(this.state.filter.row)) {
                case Number(filtervars.author):
                    searchedTasks = tasks.sort(commonService.sortAskDesc('author', this.state.filter.order == orderings.asc))
                    break;
                case Number(filtervars.complated):
                    searchedTasks = tasks.sort(commonService.sortAskDesc('complated', this.state.filter.order == orderings.asc))
                    break;
                case Number(filtervars.creationDate):
                    searchedTasks = tasks.sort(commonService.sortAskDesc('timestamp', this.state.filter.order == orderings.asc))
                    break;
                default: searchedTasks = tasks;
            }
        }


        return <React.Fragment>
            <Header
                onSearchTask={this.searchTask}
                onFilter={this.filterTask}
                onOrder={this.orderTask} />
            <Tasks
                tasks={searchedTasks}
                onStartEdit={this.startEdit}
                onShowModal={() => this.setState({ showModal: true })} />
            <Pagination
                items={this.state.tasks}
                onChangePage={(e) => this.changePage(e)} />
            <Modal
                show={this.state.showModal}
                onCloseModal={this.closeModal}
                title="add task" >
                <div>
                    <label>Title</label>
                    <input type="test" className={classes.TaskName} value={this.state.task.title} onChange={e => this.setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <ReactQuill modules={toolbarOptions} className={classes.TaskDescription} theme="snow" value={this.state.task.description} onChange={this.setDescription} />
                </div>
                <div>
                    <label>complated</label>
                    <input type="checkbox" value={this.state.complated} checked={this.state.complated} onChange={this.setComplate} />
                </div>
                <hr />
                <Steps steps={this.state.steps} onSetStep={this.setStep} onAddStep={this.addStep} onKeyUp={this.keyUp} onSortEnd={this.sortEnd} />
                <div className={classes.ButtonContainer}>
                    <input onClick={this.saveTask} type="button" value="save" />
                </div>
                {this.state.taskId && <button onClick={this.closePdfModal}>export to pdf</button>}
            </Modal>

            <Modal
                show={this.state.showPdfModal}
                onCloseModal={this.closePdfModal}
                title="export pdf" >
                <ExportPdf>
                    <div>
                        <label>{this.state.task.title}</label>
                    </div>
                    <div>
                        <label>{this.state.task.description}</label>
                    </div>
                    <div>
                        <label>complated {this.state.complated ? 'yes' : 'no'}</label>
                    </div>
                    <ul>
                        {
                            this.state.steps.map(step => {
                                return <li key={step.id} >{step.text}</li>
                            })
                        }
                    </ul>
                </ExportPdf>
            </Modal>
        </React.Fragment>
    }
}

export default TasksContainer;