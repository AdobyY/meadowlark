const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')

const app = express()

// Settings for the Handlebars representation engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
    helpers:{
        section: function (name, options) {
            if(!this._sections) this._sections = {}
            this.__sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
        res.send(headers.join('/n'))
})



app.use(express.static(__dirname + '/public'))

// User page 404
app.use(handlers.notFound)

// User page 500
app.use(handlers.serverError)

if(require.main === module){
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}...`)
    })
}else(
    module.exports = app
)