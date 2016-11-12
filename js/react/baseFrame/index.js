import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router'
import {store} from './components/App'

const root = document.getElementById('root')

const index = ()=>{
	return (
		ReactDOM.render(
			<Router></Router>,
			root
		)
	)
}

index()

store.subscribe(index)

