const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const fortunes = [
    'Не бійся невідомого',
    'Тебе чекає сюрприз',
    'Подивись на небо',
    'Перейди річку',
    'Попий кваску'
]

// Settings for the Handlebars representation engine
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {res.render('home')})

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})
})

app.use(express.static(__dirname + '/public'))

// User page 404
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// User page 500
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(PORT, () => {
    console.log(`Running Express on PORT:${PORT}`)
})