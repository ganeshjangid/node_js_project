/* Database connection */
const db = require('../utill/database');
const bcrypt = require('bcryptjs');


module.exports=class User{

    constructor(name,user_name,password,email){
        this.name=name;
        this.user_name=user_name;
        this.password=password;
        this.email=email;
        //console.log(`${this.name},${this.user_name},${this.password},${this.email}`);
    }

    createUser(callback) {

        //console.log(`${this.name},${this.user_name},${this.password},${this.email}`);
        
/*         bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(this.password, salt,function (err, hash) {
                this.password = hash;
            });
        }); */


        db.execute('INSERT into users(name,username,password,email) values(?,?,?,?)',[this.name,this.user_name,this.password,this.email])
        .then((result) => {
            //return result;
           return  callback(result);
        }).catch((err) => {
            console.log(err);
            //return err;
            return callback(err);
        });
        
        
    }


};




/* module.exports.createUser=(newUser,callback)=>{
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            
            newUser.password=hash;
            newUser.save(callback);

        });
    });
}; */