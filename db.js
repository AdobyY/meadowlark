const mongoose = require('mongoose')
const { credentials } = require('./config')
const {connectionString} = credentials.mongo
const Vacation = require('./models/vacation')

if(!connectionString) {
    console.error('Отсутствует строка подключения к MongoDB!') 
    process.exit(1)
}

mongoose.connect(connectionString) 
const db = mongoose.connection 

db.on('error', err => {
console.error('Ошибка MongoDB: ' + err.message) 
process.exit(1)
})

db.once('open', () => console.log('Установлено соединение с MongoDB')) 
module.exports = {
getVacations: async () => {
},
addVacationInSeasonListener: async (email, sku) => { 
}, 
}