// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	  setTimeout(function () {  
       navigator.splashscreen.hide();  
    }, 1000);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
	$ionicConfigProvider.platform.ios.tabs.position('bottom');
	$ionicConfigProvider.platform.android.tabs.style('standard');
	$ionicConfigProvider.platform.android.tabs.position('bottom');
	$urlRouterProvider.otherwise('/home');
	$stateProvider.state('home', {
    url: '/home', 
    templateUrl:'templates/tab-home.html', // 这个是模板位置
    controller: 'homeCtrl' // 这个是对应模板的controller名称！记住是名称不是位置
})
.state('weixindetail', {
    url: '/weixindetail', 
	cache:false,
    templateUrl:'templates/tab-weixindetail.html', // 这个是模板位置
    controller: 'homeCtrl' // 这个是对应模板的controller名称！记住是名称不是位置
}).state('huochepiao', {
    url: '/huochepiao', 
	cache:false,
    templateUrl:'templates/tab-queryhuochepiao.html', // 这个是模板位置
    controller: 'homeCtrl' // 这个是对应模板的controller名称！记住是名称不是位置
}).state('baidumap', {
      url: '/baidumap',
  	  cache:false,
      templateUrl:'templates/tab-baidumap.html', // 这个是模板位置
      controller: 'homeCtrl' // 这个是对应模板的controller名称！记住是名称不是位置
  });
});
