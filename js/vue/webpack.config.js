const webpack=require('webpack')
const path = require('path')

const ROOT = __dirname

module.exports = {
	entry:{
		index:path.resolve(ROOT,'index.js')
	},
	output:{
		// publicPath:'',
		filename:'[name].bundle.js',
		path:path.resolve(ROOT,'dest')
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel'
			},
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/\.vue$/,
				loader:'vue'
			}
		]
	},
	devServer:{
		port:7777,
		baseContent:'./',
		color:true,
		quiet:false,
		progress:true
	},
	resolve:{
		extensions:['','.js','.css','.vue'],
		alias:{
			'vue$':'vue/dist/vue.common.js'
		}
	},
	plugins:[
		new webpack.ProvidePlugin({
			'$j':'jquery',
			'jQuery':'jquery',
			'window.jQuery':'jquery'
		})
	],
	externals:{

	}
}