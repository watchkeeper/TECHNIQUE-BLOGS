const webpack = require('webpack')
const path = require('path')
const yargs = require('yargs').argv

const ROOT = __dirname
const REACT= path.resolve(ROOT,'react')
const NODE = path.resolve(ROOT,'node')

const action = yargs.action
console.log(action)

let contentBase = undefined
if(action=='server'){
	contentBase = ROOT
}else if(action==undefined){
	contentBase = path.resolve(REACT,'baseFrame')
}

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
		contentBase:contentBase,
		compress:true
	}
}

