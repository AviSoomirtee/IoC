angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
    
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    console.log('Doing login', $scope.loginData);
    console.log("LOGIN user: " + $scope.loginData.username + " - PW: " + $scope.loginData.password + " -DID " +$scope.loginData.DeviceID);
   
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
      $scope.$apply();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Telemetry', id: 1 },  // reggae 
    { title: 'Sensors', id: 2 },  // Chill
    { title: 'Error codes', id: 3 },  //Dubstep
    { title: 'Maps', id: 4 },     // Indie
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})



.controller('telecontroller', function($scope,$ionicModal,$timeout){

  

    $scope.$on("$ionicView.enter",function(){

      var firebaseurl = "https://piioc-780c4.firebaseio.com";   //
      var reference = new Firebase(firebaseurl);  
      
      // this take data from firebase and publish it in the chart

      $scope.doRefresh = function() {   // this is my refresh function to reload the data
        // here refresh data code
       

  reference.child($scope.loginData.DeviceID).on("value",function(snapshot){  // reference.child("user001")./ $scope.loginData.DeviceID
   
       
    var data = snapshot.val();     // chng
    
  
  
    
    if(data!=null){
     // console.log(data);
      $scope.LAT = data.Lat;
      $scope.LONG = data.Long;
      $scope.SAT = data.sat;
      

      $scope.data = [
        {label: "", value: data.Speed, color: "#d63728", suffix: "Kmph"}
      ];
  
      $scope.data2 = [
        {label: "", value: data.RPM, color: "#d62728", suffix: ""}
      ];

      $scope.data3 = [
        {label: "", value: data.Acc, color: "#d62728", suffix: "%"}
      ];

      $scope.data4 = [
        {label: "", value: data.Fuel_Intake, color: "#d63728", suffix: "%"}
      ];
  
      $scope.data5 = [
        {label: "", value: data.Air_Intake, color: "#d62728", suffix: "%"}
      ];

      $scope.data6 = [
        {label: "", value: data.Fuel_com, color: "#d62728", suffix: "%"}
      ];
      $scope.data7 = [
        {label: "", value: data.sat, color: "#d62728", suffix: "%"}
      ];
  
      $scope.options = {thickness: 5, mode: "gauge", total: 100};
  
      $scope.options2 = {thickness: 5, mode: "gauge", total: 10000};

      $scope.options3 = {thickness: 5, mode: "gauge", total: 100};

      $scope.options4 = {thickness: 5, mode: "gauge", total: 100};

      $scope.options5 = {thickness: 5, mode: "gauge", total: 100};

      $scope.options6 = {thickness: 5, mode: "gauge", total: 100};


     $scope.$apply();
   
     
    }  // close if data not null
  }) // close ref / snapshot


  
  $scope.$broadcast('scroll.refreshComplete');
  $scope.$apply() 
 };      // refresh ends here


 })   // close scope.on

 

}) // close telecontroller

.controller('MapCtrl', function($scope,$state, $cordovaGeolocation){    // maps controler
  var options = {timeout:10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    //var LatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var LatLng = new google.maps.LatLng(-20.350347,57.597335);
    
    var LatLng2 = new google.maps.LatLng(-20.3440553,57.5959258);  //-20.3440553,57.5959258,15z

    var LatLng3 = new google.maps.LatLng(-20.347281, 57.581975); //-20.347281, 57.581975

    //var LatLng = new google.maps.LatLng(LAT,LONG);
    //console.log(data.Lat,data.Long);

    var mapOptions = { 
      center: LatLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"),mapOptions);

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map:$scope.map,
        animation: google.maps.Animation.DROP,
        position: LatLng
      });

      var marker2 = new google.maps.Marker({
        map:$scope.map,
        animation: google.maps.Animation.DROP,
        position: LatLng2
      });

      var marker3 = new google.maps.Marker({
        map:$scope.map,
        animation: google.maps.Animation.DROP,
        position: LatLng3
      });

      var infoWindow = new google.maps.InfoWindow({
        content: "My current location!"
      });

      var infoData = new google.maps.InfoWindow({
        content: "Free parking space here!"
      });

      var myLc = new google.maps.InfoWindow({
        content: "Accident here!"
      });

      google.maps.event.addListener(marker,'click',function(){
        infoWindow.open($scope.map,marker);
      });

      google.maps.event.addListener(marker2,'click',function(){
        infoData.open($scope.map,marker2);
      });

      google.maps.event.addListener(marker3,'click',function(){
        myLc.open($scope.map,marker3);
      });

    })
  }, function(error){
    console.log("Could not get location");
  })
  });