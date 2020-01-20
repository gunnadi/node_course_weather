const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars html template & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// static directory to server
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'mee mee mee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'mee mee mee'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'i need somebody help, not just anybody help..',
        name: 'mee mee mee'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({
            error: 'Address Must Provided'
        })
        return
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, fdata) => {

            if (error) {cd
                res.send({error: 'Forecast Search Error ' + error })
                return;
            }

            res.send({
                forecast: fdata,
                location,
                adress: req.query.address
            })

        })

    })



})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        res.send({
            error: 'Search Must Provided'
        })
        return;
    }
    console.log(req.query)
    res.send({
        products: [req.query.search]
    })
})

/* harus terakhir */
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'nobody helps',
        name: 'mee mee mee'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page Not Found.!',
        name: 'mee mee mee'
    })
})


app.listen(3000, () => {
    console.log('server up, listening on port 3000')
})


/* app.get('', (req, res) => {
    res.send('<h1>Main Page</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'gun',
        occupation: 'employee'
    }, {
        name: 'adi',
        occupation: 'employee'
    },])
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})*/