import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(){
    super();
    this.state = {
      itemArr: []
    }
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.getItems();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getItems = () => {
    axios.get('/api/shelf')
      .then((response) => {
        console.log('in the axios GET call', response.data);
        this.setState({
          itemArr: response.data
        })
        console.log(this.state.itemArr);
      })
  }

  deleteItem = (id) => {
    // const id = item.id;
    console.log('id of item to be deleted:', id);
    axios.delete(`api/shelf/${id}`)
      .then((response) => {
          this.getItems();
        }).catch((error) => {
          alert('Unable to delete item.');
        })
  }

  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <h1> Welcome to the Shelf!</h1>
        
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        {this.state.itemArr.map((item, i) => <div key={i}><img alt="items" src={item.image_url} /><p>{item.description}</p><br/><button onClick={() => this.deleteItem(item.id)}>Delete</button></div>
        )}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
