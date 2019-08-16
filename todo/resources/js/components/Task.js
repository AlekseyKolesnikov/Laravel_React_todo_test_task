import React, { Component } from 'react';

export default class Task extends Component {
    onCheck = (event) => {
        this.props.onCheck(this.props.todo, event.target.checked);
    };

    render() {
        return (
            <div className="row grid-data">
                <div className="col-1">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id={this.props.todo.id}
                               checked={this.props.todo.completed} onChange={this.onCheck.bind(this)}/>
                        <label className="custom-control-label" htmlFor={this.props.todo.id}>&nbsp;</label>
                    </div>
                </div>
                <div className="col-1">
                    {this.props.todo.id}
                </div>
                <div className="col">
                    {this.props.todo.title}
                </div>
            </div>
        );
    }
}
