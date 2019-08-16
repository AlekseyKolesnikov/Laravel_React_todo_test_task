import React, { Component } from 'react';

export default class AddTaskDialog extends Component{
    constructor(props) {
        super(props);

        this.input = React.createRef();
    }

    componentDidMount() {
        this.input.current.focus();
    }

    onOkClick() {
        const value = this.input.current.value;
        if (value)
            this.props.onOkClick(value);
    }

    render() {
        return (
            <div className="dark-overlay">
                <div className="position-relative align-content-center">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                        onClick={this.props.onCloseClick}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Title:</label>
                                        <input type="text" className="form-control" id="recipient-name" ref={this.input}/>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={this.props.onCloseClick}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.onOkClick.bind(this)}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
