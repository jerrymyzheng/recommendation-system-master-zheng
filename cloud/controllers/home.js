var temp = require('../utilities/PageTemp');
var db = require("./db_Connection");
//Home
exports.home=function(req,res){
    console.log("exports.home");
    res.render('dashboard.html',temp.dashboard("Dashboard",{user:req.session.user,content:null,tests:{microsoft:{name:"Microsoft",value:"$ 1 trillion"},apple:{name:"Apple",value:"$ 5 trillion"}}}));
};
//Dashboard
exports.dashboard=function(req,res){
    res.render('dashboard.html',temp.dashboard("Dashboard",{user:req.session.user}));
};
//Profile
exports.profile=function(req,res){
        res.render('profile.html',temp.dashboard("Dashboard",{user:req.session.user,content:"profile"}));
};

exports.portfolio=function(req,res){
    if(req.session.user==null){
        res.redirect("http://localhost:1337/");
    }
    res.locals.user=req.session.user;
    res.locals.content="portfolio";
    res.render("Personal_Stock_Recommendation_System");
};

exports.market_price=function(req,res){
    if(req.session.user==null){
        res.redirect("http://localhost:1337/");
    }
    res.locals.user=req.session.user;
    res.locals.content="marketprice";
    res.render("Personal_Stock_Recommendation_System");
};
exports.history=function(req,res){
    if(req.session.user==null){
        res.redirect("http://localhost:1337/");
    }
    res.locals.user=req.session.user;
    res.locals.content="history";
    res.render("Personal_Stock_Recommendation_System");
};
exports.prediction=function(req,res){
    res.render('prediction.html',temp.dashboard("Dashboard",{user:req.session.user}));

};
exports.reservation=function(req,res){
    if(req.session.user==null){
        res.redirect("http://localhost:1337/");
    }
    res.locals.user=req.session.user;
    res.locals.content="reservation";
    res.render("Personal_Stock_Recommendation_System");
};
exports.calendar=function(req,res){
    if(req.session.user==null){
        res.redirect("http://localhost:1337/");
    }
    res.locals.user=req.session.user;
    res.locals.content="calendar";
    res.render("Personal_Stock_Recommendation_System");
};