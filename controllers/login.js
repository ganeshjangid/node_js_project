const User=require('../models/user');


exports.getLoginPage = (req, res, next) => {
    //console.log(req.url);
    res.render('login', {
        title: "Login Form "
    });
};

exports.loginValid=(req,res,next)=>{
    //console.log(req.body);
    let name = req.body.full_name;
    let user_name = req.body.user_name;
    let password = req.body.password;
    let email=req.body.email;

    //console.log(`${name},${user_name},${password},${email}`);
    
    /* Use validation for check  */

    req.checkBody('full_name', 'Name is required').notEmpty();
    req.checkBody('user_name', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is required').isEmail();


    let errors=req.validationErrors();

    //console.log(errors);
    if (errors) {
        //console.log("yes");
        res.render('login',{
            errors:errors,
            title:'Registration Form'
        });
    }else{
        //console.log("Passed");
        let users=new User(name, user_name,password,email);

        users.createUser((err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            //console.log(result);
            

            req.flash('success_msg',"You are register and you can login");

            res.redirect('/login');
        })
    }

};

