const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

// Settings for the Handlebars representation engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(express.static(__dirname + '/public'))

// User page 404
app.use(handlers.notFound)

// User page 500
app.use(handlers.serverError)

app.listen(PORT, () => {
    console.log(`Running Express on PORT:${PORT}`)
})