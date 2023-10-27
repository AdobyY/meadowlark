const express = require('express')
const expressHandlebars = require('express-handlebars')
const handlers = require('./lib/handlers')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const { credentials } = require('./config')
const expressSession = require('express-session')
const flashMiddleware = require('./lib/middleware/flash')


const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))

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

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.post('/contest/vacation-photo/:year/:month', (req, res) => { 
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      if(err) return res.status(500).send({ error: err.message }) 
      handlers.vacationPhotoContestProcess(req, res, fields, files) 
    })
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