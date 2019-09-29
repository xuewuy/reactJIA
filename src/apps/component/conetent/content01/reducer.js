import {createReducer} from 'redux-create-reducer';
import {fromJS} from 'immutable';

import {
    ADD_ONE_USER
} from './action';

const initState = fromJS({
    data: [{
        name: 'doudou',
        age: 32,
        phone: 123456789,
        email: '123456789@163.com',
        key: 1,
    }]
});

const handlers = {
    [ADD_ONE_USER]: (user, action) => {
        return user.set('data', user.get('data').push(fromJS(action.payload)));
    }
};

export default createReducer(initState, handlers);