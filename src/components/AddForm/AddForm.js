import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class AddForm extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  state = {
      newSpice: {
          name: '',
          image: '',
          description: '',
      }
  }

  handleSpice = (key) => (event) => {
    console.log('Youre adding a spice')
    this.setState({
        newSpice: {
            ...this.state.newSpice,
            [key]: event.target.value
        }
    })
  }

  addSpice = (event) => {
      console.log('Youre adding a spice');
      event.preventDefault();
      this.props.dispatch({ type: 'ADD_SPICE', payload: this.state.newSpice});
      this.setState({
            newSpice: {
                name: '',
                image: '',
                description: '',
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
                <input type="text" value={this.state.newSpice.name} onChange={this.handleSpice('name')} placeholder="spice name"/>
                <input type="text" value={this.state.newSpice.image} onChange={this.handleSpice('image')} placeholder="img URL"/>
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