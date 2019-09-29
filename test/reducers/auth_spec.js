import {
	Map, fromJS
}
from 'immutable';
import {
	expect
}
from 'chai';

import reducer from '../../src/reducers/auth';

describe('权限reducer测试', () => {
	it('登录成功', () => {
		const initialState = Map();
		const action = {
			type: 'LOGIN_SUCCESS'
		};
		const nextState = reducer(initialState, action);
		expect(nextState).to.equal(fromJS({
			isLogined:true
		}));
	});
});