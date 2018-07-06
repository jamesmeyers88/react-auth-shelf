import { combineReducers } from 'redux';
import axios from 'axios';

const shelf = (state = [], action) => {
    console.log('in shelf reducers');
    if(action.type === 'ADD_SPICE') {
        axios.post('/api/shelf', action.payload).then(response => {
            console.log('added spice');
        }).catch(err => {
            console.log({err});
        })
    } else if(action.type === 'GET_SPICES') {
        console.log('getting spices');
        
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
