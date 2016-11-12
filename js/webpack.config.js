const webpack = require('webpack')
const path = require('path')

const ROOT = __dirname
const REACT= path.resolve(ROOT,'react')
const NODE = path.resolve(ROOT,'node')

module.exports = {
	entry:{
		frame:path.resolve(REACT,'baseFrame/index.js')
	},
	output:{
		path:path.resolve(REACT,'baseFrame'),
		filename:'[name].bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel',
				exclude:'node_modules',
				query:{
					presets:['react','es2015']
				}
			}
		]
	},
	devServer:{
		historyApiFallback:true,
		port:8888,
		contentBase:path.resolve(REACT,'baseFrame'),
		compress:true
	}
}

