import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import Task from "./Task";

export default class Tasks extends Component {
    state = {
        todos: [
            {
                id: 1,
                title: 'Task #1',
                completed: false,
            },
            {
                id: 2,
                title: 'Task #2',
                completed: true,
            },
            {
                id: 3,
                title: 'Task #3',
                completed: false,
            },
        ],
    };

    onCheck = (todo, checked) => {
        const i = this.state.todos.indexOf(todo);

        this.setState({
            todos: update(this.state.todos, {[i]: {completed: {$set: checked}}})
        })
    };

    render() {
        const items = this.state.todos.map((todo) =>
            <Task key={todo.id} todo={todo} onCheck={this.onCheck.bind(this)}/>
        );

        return (
            <div className="container mt-5">
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
