import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      newSpice: {
        image_url: '',
        description: '',
        person_id: ''
    }
    }
  }
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleSpice = (key) => (event) => {
    this.setState({
        newSpice: {
            ...this.state.newSpice,
            [key]: event.target.value,
            person_id: this.props.user.userName
        }
    })
  }

  addSpice = (event) => {
  event.preventDefault();
      this.props.dispatch({ type: 'ADD_SPICE', payload: this.state.newSpice});
      this.setState({
            newSpice: {
                image_url: '',
                description: '',
                person_id: ''
            }
      })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <h1>Spice up your life!</h1>
            <form onSubmit={this.addSpice}>
                <input type="text" value={this.state.newSpice.image_url} onChange={this.handleSpice('image_url')} placeholder="img URL"/>
                <input type="text" value={this.state.newSpice.description} onChange={this.handleSpice('description')} placeholder="brief description"/>
                <input type="submit" value="Get Spicy!"/>
            </form>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddForm);