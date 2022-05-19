import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as todoActions } from '../reducers/todo';

class EditTodo extends Component {

    state = {
        item: { title: '' }
    }

    componentDidMount() {
        const { match, todo } = this.props;
        const item = todo.items.find(item => item.id === match.params.id) || { title: '' };

        this.setState({ item });
    }

    handleChange = name => e => {
        this.setState({
            item: {
                ...this.state.item,
                [name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { item } = this.state;
        if (item.title) {
            const { todoActions } = this.props;
            todoActions.update(item);
            this.goBack();

        }
    }
    goBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {

        const { item } = this.state;

        return (
            <div className="toDoMain">
                <form onSubmit={this.handleSubmit}>
                    <TextField className="input2"
                        id="todo"
                        onChange={this.handleChange('title')}
                        value={item.title}
                        autoComplete="off"
                        autoFocus={true}
                        InputProps={{
                            endAdornment:
                                (<InputAdornment position="end">
                                    <button id="button" onClick={this.handleSubmit}/>
                                </InputAdornment>)
                        }}
                    />
                    <button id="button" onClick={this.handleSubmit}></button>
                </form>
            </div >
        );
    }
}

const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = (dispatch) => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);