const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://yashgupta61969:fuckuall@cluster0.zvwfypr.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('connected')).catch(err=>console.log(err))