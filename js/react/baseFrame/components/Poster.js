import React from 'react'

const Poster = ({content})=>(
	<div>
		<textarea value={content}></textarea>
	</div>
)

Poster.propTypes = {
	content:React.PropTypes.string.isRequired
}
export default Poster