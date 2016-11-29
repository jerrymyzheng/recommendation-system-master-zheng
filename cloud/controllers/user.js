var temp = require('../utilities/PageTemp');
//待定
exports.checklogin = function(req,res){
    if(req.session.user==null){
        res.render("User_Login",{err:"Type in your username and password"});
    }else{
        res.locals.user = req.session.user;
        res.redirect("http://localhost:1337/home");
    }
};
//New_User:direct to signup page, method:get
exports.newUser = function (req,res) {
    if(req.session.user==null){
        res.render("signup",temp.signup("Signup",{err:null}));
    }else{
        res.redirect("http://localhost:1337/home")//when use get request "/user_new_user" after successful login
    }
}
//Login   method:post
exports.login = function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        Parse.User.logIn(username,password,{
            success:function(user){
                console.log(user);
                var x={username:req.body.username,id:user.id};
                req.session.user =x;
                //bind local variables and redirect
                console.log("login创建的session是"+JSON.stringify(req.session));
                res.redirect("http://localhost:1337/home");
            },
            error:function(user,error){
                console.log(error.message);
                res.render("login",temp.normal("Login",{err:error.message}));
            }
        });
};

//Signup method:post
exports.signUp = function(req,res){
    var user=new Parse.User();
    user.set("username",req.body.username);
    user.set("password",req.body.password);
    user.signUp(null,{
        success:function(user){
            console.log(user);
            var b ={username:req.body.username,id:user.id};
            req.session.user = b;
            res.redirect("http://localhost:1337/home");
        },
        error:function(user,error){
            console.log(error.message);
            res.render("signup.html",temp.signup("Signup",{err:error.message}));
        }
    });
}

//Logout
exports.logout=function (req,res,next) {
    req.session.destroy();
    next();

}