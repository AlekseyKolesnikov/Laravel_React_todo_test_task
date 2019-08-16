import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import axios from 'axios';
import Task from "./Task";
import AddTaskDialog from './AddTaskDialog';

export default class Tasks extends Component {
    state = {
        addDialog: false,
        todos: [
            // {
            //     id: 1,
            //     title: 'Task #1',
            //     completed: false,
            // },
            // {
            //     id: 2,
            //     title: 'Task #2',
            //     completed: true,
            // },
            // {
            //     id: 3,
            //     title: 'Task #3',
            //     completed: false,
            // },
        ],
    };

    componentDidMount() {
        axios.get('api/tasks')
            .then(res => {
                //console.log(res);
                this.setState({ todos: res.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCheck(todo, checked) {
        const i = this.state.todos.indexOf(todo);

        this.setState({
            todos: update(this.state.todos, {[i]: {completed: {$set: checked}}})
        });
    }

    onAddClick() {
        this.setState({addDialog: true});
    }

    onAddDialogCloseClick() {
        this.setState({addDialog: false});
    }

    onAddDialogOkClick(title) {
        const todo = {
            id: this.state.todos.length + 1,
            title: title,
            completed: false,
        };

        this.setState(prevState => ({
            todos: [...prevState.todos, todo]
        }));

        this.setState({addDialog: false});
    }

    render() {
        const items = this.state.todos.map((todo) =>
            <Task key={todo.id} todo={todo} onCheck={this.onCheck.bind(this)}/>
        );

        let addDialog = null;
        if (this.state.addDialog) {
            addDialog = <AddTaskDialog onCloseClick={this.onAddDialogCloseClick.bind(this)} onOkClick={this.onAddDialogOkClick.bind(this)}/>
        }

        return (
            <div className="container mt-5">
                <button className="btn btn-outline-secondary mb-3" onClick={this.onAddClick.bind(this)}>Add</button>

                {addDialog}

                <div className="row grid-title">
                    <div className="col-1">
                        Status
                    </div>
                    <div className="col-1">
                        ID
                    </div>
                    <div className="col">
                        Title
                    </div>
                </div>

                {items}
            </div>
        );
    }
}

if (document.getElementById('react')) {
    ReactDOM.render(<Tasks />, document.getElementById('react'));
}
