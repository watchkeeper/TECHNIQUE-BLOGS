/*
Infact this is a config document of node web application
tool:
	supervisor : auto restart when change
	forever	: forever running -l log -e errlog
*/
const express = require('express')
const path = require('path')
/*
all of these is middleware to deal with http request or response;
setting could be global or as judgeLogin middleware during funciton
*/
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')

const router = require('./routes')

const app = express()

//use as global  
/*pares application/x-www-data-urlencoded and applicaiton/json*/
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

/*
	req.cookies.name
	res.cookie('name','value')
	res.clearCookie('name')
*/
app.use(cookieParser())

/*
	req.session.value
	req.session.value=
	req.session.destroy()
*/
app.use(session({
	cookie:{
		path:'/',
		httpOnly:true,
		//not only https
		secure:false,
		maxAge:1000*60*60*24
	},
	name:'NODESESSIONID',
	//I'd alway change session
	resave:false,
	secret:'modlefairy',
	saveUninitialized:false
}))

app.use(morgan('combined'))

router(app)

const PORT = process.env.port || 622
app.listen(PORT)
console.log(`Server running at port ${PORT}`)