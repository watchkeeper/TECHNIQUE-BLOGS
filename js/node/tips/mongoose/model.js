const mongoose = require('mongoose')
const lover_schema = require('./schema')


const lover = mongoose.model('lover',lover_schema.lover_schema)

exports.lover_model = lover
