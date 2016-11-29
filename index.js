// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var partials = require('express-ejs-layouts');
var mysql = require('mysql');
var temp = require("./cloud/utilities/PageTemp");

var session = require('express-session');//express-session
var cookieParser = require('cookie-parser');//cookieparser
var bodyParser=require("body-parser");//Bodyparser
var multer = require('multer'); //multer
var upload = multer(); // for parsing multipart/form-data
var router = express.Router();//for parsing multipart/form-data
var home = require("./cloud/controllers/home");//
var user = require('./cloud/controllers/user');
var auth = require('./cloud/utilities/auth');//user authentication
var databaseUri = 'mongodb://dev:dev_thebigger@ds057816.mlab.com:57816/thebigger';//mongodb://localhost:27017/partyon';//process.env.DATABASE_URI || process.env.MONGODB_URI;
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri ,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'theb1gger',
  masterKey: process.env.MASTER_KEY || "master", //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey
var j=bodyParser.json();
var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);//use ejs template for rendering html
app.set('views', path.join(__dirname, 'cloud/views'));
app.use(partials);

app.use(bodyParser.urlencoded({ extended: true }));// 设置parse application/x-www-form-urlencoded
app.use(bodyParser.json());// 设置parse application/json
app.use(session({secret:"12345",name:"testapp",cookie:{maxAge:80000},resave:false,saveUninitialized:true}));
// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')));
// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);


// Parse Server plays nicely with the rest of your web routes
app.get('/', auth.auth,home.dashboard);//第一次访问网站
app.get("/home",auth.auth,home.home);//

app.post('/user/login', user.login);//登陆




// Parse Server plays nicely with the rest of your web routes
app.get('/', auth.transURL, home.home);//localhost:1337
app.get("/home",auth.auth, home.home);//home


app.get("/user/logout",user.logout,auth.auth);//Logout

app.post('/user/login', user.login);//login
app.get('/user/new_user', user.newUser);//redirect to signup page
app.post("/user/signup",user.signUp);//signup
app.get("/user/logout",user.logout);//Logout


app.get("/home/dashboard",auth.auth, home.dashboard);//dashboard页面
app.get("/home/profile",auth.auth,home.profile);//profile页面
app.get("/home/portfolio",auth.auth,home.portfolio);//portfolio页面
app.get("/home/marketprice",auth.auth,home.market_price);//marketprice页面
app.get("/home/history",auth.auth,home.history);//history页面
app.get("/home/prediction",auth.auth,home.prediction);//prediction页面
app.get("/home/reservation",auth.auth,home.reservation);//reservation页面
app.get("/home/calendar",auth.auth,home.calendar);//calendar页面

app.get("/stock_subscribe",function(req,res){
  res.render("stock_scubscribe.html",temp.dashboard("Stock_Subscribe",{user:null,content:null}));
});

app.get("/linechart",function(req,res){
    res.render("linechart.html",temp.dashboard("linechart",{user:null,content:null}));
});

app.get("/radarchart",function(req,res){
    res.render("radarchart.html",temp.dashboard("radarchart",{user:null,content:null}));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('stock_recom_backend running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
