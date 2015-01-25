/*jshint unused: vars */
define([
  'angular',
  'controllers/main-controller',
  'controllers/tree',
  'directives/tree', 
  'services/tree'
]/*deps*/, 

function (angular, MainCtrl, TreeCtrl, TreeDirective, TreeFactory)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name rollogApp
   * @description
   * # rollogApp
   *
   * Main module of the application.
   */

  return angular
    .module('rollogApp', [
      'rollogApp.controllers.MainCtrl',
      'rollogApp.controllers.TreeCtrl',
      'rollogApp.directives.Tree',
      'rollogApp.services.Tree',
      /*angJSDeps*/
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngAnimate',
      'ngTouch'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
