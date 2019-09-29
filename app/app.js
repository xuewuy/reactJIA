import './index.html';
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Map } from 'immutable'
import promise from 'es6-promise'
import { AppLoader, appMiddleware, reducer } from 'appLoader'
import { fetchWrapper } from './utils'
import app from './app'
import * as contextUtil from './context'
import * as environmenttUtil from './environment'
import './assets/styles/index.less'
import './api'
import 'babel-polyfill'
import moment from 'moment'


//const middleware = [appMiddleware(apps, {...fetchWrapper,...contextUtil }, {...contextUtil}),logger()]
const middleware = [appMiddleware(app, {...fetchWrapper,...contextUtil,...environmenttUtil }, {...contextUtil})]

const store = createStore(reducer, Map(), applyMiddleware(...middleware))


promise.polyfill()


render(
	<Provider store ={store}>
		<AppLoader path='app/root' />
	</Provider>,
	document.getElementById('app')
)
