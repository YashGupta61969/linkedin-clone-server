const express = require('express');
const cors = require('cors');
const router = require('./src/routes');
require('./src/db/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public',express.static('./public/'))
app.use('/', router)

app.listen(8000)