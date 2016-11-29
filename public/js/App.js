/**
 * Created by Ming on 11/27/16.
 */
var app = angular.module('TheBiggerApp', []);
app.controller('CommonCtrl', function($scope,$http) {
    $scope.dashboard=function () {
        $http.get("/home/dashboard").then(function(response){

            alert(response.toString());
        });
    }
    $scope.profile=function () {
        $http.get("/home/profile").then(
            function suc(response){
                $scope.TEST=response.data.num;
                alert(response.data.message+" at least works for profile request");},
            function fail(response){
                alert("FAILURE");
            });
    }
});
app.controller('DashboardCtrl',function($scope,$http){

});