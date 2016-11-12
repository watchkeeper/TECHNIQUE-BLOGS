//concentrate on router
import * as App from './App'
import React from 'react'
import { Router,Route,hashHistory } from 'react-router'

const ALL = ()=>(
	<Router history={hashHistory}>
		<Route path='/' component={App.Home}></Route>
		<Route path='/add' component={App.Add}></Route>
	</Router>
)

export default ALL