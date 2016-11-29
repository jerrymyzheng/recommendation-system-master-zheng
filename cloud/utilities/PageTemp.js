/**
 * Created by Ming on 11/20/16.
 */
exports.dashboard = function(title,data){
    if(!data)
        data = {};
    return {layout:"dashboard_temp.html", title:title, data:data}
};
exports.normal = function(title,data){
    if(!data)
        data = {};
    return {layout:"login.html",title:title,data:data}
};

exports.signup = function(title,data){
    if(!data)
        data = {};
    return {layout:"signup.html",title:title,data:data}
};
//TBD
exports.test = function(title,data){
    if(!data)
        data = {};
    return {layout:"Personal_Stock_Recommendation_System.ejs",title:title,data:data}
};