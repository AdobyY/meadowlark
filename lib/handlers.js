const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) =>
    res.render('about', {fortune: fortune.getFortune()})

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')

exports.newsletterSignup = (req, res) => {
    res.render('newsletter', {crf: "Токен CSRF"})
}
exports.newsletterSignupProcess = (req, res) => {
    console.log('Форма (із рядка запиту): ' + req.query.form)
    console.log('Токен CSRF (із скритого поля форми): ' + req.body._csrf)
    console.log('Ім\'я (із видимого поля форми): ' + req.body.name)
    console.log('E-mail (із видимого поля форми): ' + req.body.email) 
    res.redirect(303, '/newsletter-signup/thank-you')
}
exports.newsletterSignupThankYou = (req, res) => 
    res.render('newsletter-signup-thank-you')

exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'Тут знаходиться токен CSRF' }) 
}
exports.api = {
newsletterSignup: (req, res) => {
    console.log('Токен CSRF (із скритого поля форми): ' + req.body._csrf)
    console.log('Ім\'я (із видимого поля форми): ' + req.body.name)
    console.log('E-mail (із видимого поля форми): ' + req.body.email) 
    res.send({ result: 'success' })
}, 
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('дані поля', fields)
    console.log('файли', files)
    res.redirect(303, '/contest/vacation-photo-thank-you')
}