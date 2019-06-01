const express=require('express');
const app = new express();

/*  Body Midddleware */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

/* Express validator */
const expressValidator = require('express-validator');
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


const loginRouter = require("./routers/login");
app.use(loginRouter);



const path=require('path');
const cookieParser=require('cookie-parser');
const ejs=require('ejs');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const LocalSta=require('passport-local').Strategy;



let port=3080;
app.set('view engine','ejs');
app.set('views','views');



/* Static folder */
app.use(express.static(path.join(__dirname,'/public')));
//app.use(express.static(__dirname + '/public'));
//app.use('/public', express.static(__dirname + '/public'));

/* Express Session */
app.use(session({
    secret:'ganeshsuthar',
    saveUninitialized:true,
    resave:true
}));

/* Passport session */
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser);


/* Connect flash */
app.use(flash());


/* Global variable */
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});


/* Connection test */
/* db.execute('SELECT * from users')
.then(([row1,row2]) => {
    console.log(row1);
    
}).catch((err) => {
    console.log(err);
});
 */

app.listen(port, () => console.log(`This server is running on port no ${port}`));




