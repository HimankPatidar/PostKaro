require('dotenv').config();
const  express = require('express')
const session = require('express-session');
const app = express();
const port = process.env.PORT || '3000'
const {join} = require('path')
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate');

const flash = require('connect-flash');
const {connectDB} = require("./db/connectdb.js")
const DATABASE_URL= "mongodb+srv://PostKaro:postkaro@postkaro.cdjcdaq.mongodb.net/"
// const DATABASE_URL= process.env.DATABASE_URL || 'mongodb+srv://patidarhimank005:patidarhimank@postkaro.gdtuqmc.mongodb.net/';
const web = require("./routes/web.js")
const userRoute = require("./routes/users.js")
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/users.js')
const passportLocalMongoose = require('passport-local-mongoose');
const reviewRoute = require("./routes/review.js")
const multer = require("multer");

// DATABASE CONNECTIONN
connectDB(DATABASE_URL)
// Set Template Engine
app.engine('ejs', ejsMate)
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(express.static("uploads"))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})


// Static Files
app.use(express.static(join(process.cwd(), "public")))
// LOAD ROUTES
app.use("/", web)
app.use("/", userRoute)
app.use("/posts/:id/reviews", reviewRoute)




app.use((err,req,res,next) => {
   const {statusCode=500, message = "Something Went Wrong"} = err
    res.status(statusCode).send(message)
})

app.listen(port, () => {
    console.log(`SERVER listening at https://localhost:${port}`) ;
})