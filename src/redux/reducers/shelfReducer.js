import { combineReducers } from 'redux';
import axios from 'axios';

const shelf = (state = [], action) => {
    console.log('in shelf reducers');
    if(action.type === 'ADD_SPICE') {
        state = [...state, action.payload];
    } else if(action.type === 'GET_SPICES') {
        axios.get('/api/shelf').then(response => {
            console.log(response.data.rows);
            state = response.data.rows;
        }).catch(err => {
            console.log({err});
        })
    }
    return state;
}

export default combineReducers({
  shelf,
});
