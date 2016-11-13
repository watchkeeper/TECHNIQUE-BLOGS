//page aggregate here for router
import React from 'react'
import Inputer from './Inputer'
import Poster from './Poster'
import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import * as action from '../actions'

export const store = createStore(reducer,applyMiddleware(thunk))

export const Home = ({})=>{
	return (
		<Poster content={store.getState().content}></Poster>
	)
}
console.log(store.getState())
export const Add = ({}) => {
	return (
		<div>
			<Inputer 
				placeholder={store.getState().placeholder} 
				//从Inputer传过来的
				emitAction={(userMsg)=>{
						store.dispatch(action.POST_MSG(userMsg))
						}
				}
			>
			</Inputer>
			<Poster content={store.getState().content}></Poster>
		</div>
	)
}

