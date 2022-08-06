const express = require('express')
const http = require('http')
const app = express()
const Container = require('./class.js')
const routes = require('./routes.js')
const handlebars = require('express-handlebars')
const prodContainer = new Container()
const file = './products.json'
const path = require('path')

const httpServer = http.createServer(app)

app.use(express.static(path.join(__dirname ,"/public")))


app.set('views', path.join(__dirname, './public/views'))
app.set('view engine', 'hbs' )

app.engine('hbs', handlebars.engine({
    extname: '.hbs', 
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname+'/public/views/layouts',
    partialsDir: __dirname+'/views/partials'
}))

// app.set('view engine', 'ejs')
// app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/productos', routes)




const PORT = 8000
const sv = httpServer.listen(PORT, () =>{
    console.log(`PORT ${PORT} ONLINE`)
})

app.get('/', (req, res) =>{
    res.render("main",{
    })
})