import React, { Component } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { CgPlayListCheck } from "react-icons/cg";
import { FaSmileBeam } from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as todoActions } from '../reducers/todo';
import uniqueId from 'lodash/uniqueId';

class Home extends Component {
    state = {
        form: {title: ''},
        filter: 'all'
    }

    handleChangeFilter = e => {
        this.setState({ filter: e.target.value });
    }

    handleChange = name => e => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.state;
        if (form.title) {
            const { todoActions } = this.props;
            const item = {
                id: uniqueId(),
                title: form.title,
                completed: false
            };
            todoActions.create(item);
            this.setState({ form: { title: '' } });
        }
    }

    handleToggleCompleted = value => (e) => {

        const { todoActions } = this.props;
        const item = {
            ...value,
            completed: !value.completed
        }
        todoActions.update(item);
    }

    handleEdit = value => e => {
        const { history } = this.props;
        history.push(`/edit/${value.id}`);
    }

    handleDelete = value => e => {
        const { todoActions } = this.props;
        todoActions.delete(value);
    }

    handleClear = e => {
        this.setState({ filter: e.target.value });
    }

    filterTodoItems = (item) => {
        const { filter } = this.state;
        if (filter === 'completed') {
            return item.completed;
        } else if (filter === 'active') {
            return !item.completed;
        } else {
            return true;
        }
    }

    render() {
        const { todo } = this.props;
        const { form, filter } = this.state;

        return (
            <div className="toDoMain">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input className="input"
                                id="todo"
                                placeholder="  Add New Todo..."
                                onChange={this.handleChange('title')}
                                value={form.title}
                                autoComplete="off"
                            />
                        </label><hr />
                        <input className="select" type="checkbox"
                             />
                        <label className="selectall">Select <CgPlayListCheck/></label>
                    </form><hr />
                    {/* todolist */}
                    <div className="toDoItem">
                        {todo.items.filter(this.filterTodoItems).map(value => (
                            <div>
                                <span key={value.id}  
                                    onClick={this.handleToggleCompleted(value)}
                                >
                                    <input className="check" 
                                        type="checkbox"
                                        checked={value.completed}
                                    />
                                </span>
                                    <input type="text" value={value.title}
                                        onDoubleClick={this.handleEdit(value)}
                                    />
                                    <span className="delete button" 
                                        onClick={this.handleDelete(value)}
                                    >✖</span>
                            </div>
                        ))}
                    </div><hr />
                    {/* footer */}
                    <div >
                        {todo.items.length > 0 &&
                            <div className="footer">
                                <select
                                    value={filter}
                                    onChange={this.handleChangeFilter}
                                >
                                    <option className="all" value='all'>All Todo</option>
                                    <option className="active" value='active'>Active</option>
                                    <option className="completed" value='completed'>Completed</option>
                                </select>
                                <button className="clear" 
                                    onClick={this.handleClear}
                                >Clear All <FaTrashAlt/></button>
                            </div>
                        }
                        <h6>Copyright © Quantrok1204 <FaSmileBeam/></h6>  
                    </div>
            </div>
        );
    }
}

const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);