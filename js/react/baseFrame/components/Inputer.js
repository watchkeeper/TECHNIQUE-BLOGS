import React from 'react'

class Inputer extends React.Component{
	constructor(){
		//使得this指向父类的
		super()
	}
	postMsg(){
		const userMsg = this.refs.input.value
		this.props.emitAction(userMsg)

	} 
	render(){
		return (
			<div>
				<input type='text' ref='input' placeholder={this.props.placeholder} />
				<button ref='button' onClick={this.postMsg.bind(this)}>点击post信息</button>
			</div>
		)
	}
} 
Inputer.defaultProps = {
	placeholder:'就算世界抛弃了我,我也不能放弃修复这个世界',
	emitAction(){}
}
Inputer.propTypes = {
	placeholder:React.PropTypes.string,
	emitAction:React.PropTypes.func.isRequired
}
export default Inputer
