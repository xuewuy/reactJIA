
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import freeze from "redux-freeze"
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {Map} from 'immutable';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

let middlewares = [];
middlewares.push(thunk);
middlewares.push(logger);
middlewares.push(freeze);

//添加中间件
let middleware = applyMiddleware(...middlewares);
//添加redux dev tools,可以在谷歌商城里直接安装工具,搜索名字
middleware = compose(middleware, composeWithDevTools);

const reducer = combineReducers(reducers);

const store = createStore(
    reducer,
    Map({}),
    middleware
);

export default store;