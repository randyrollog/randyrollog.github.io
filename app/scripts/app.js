/*jshint unused: vars */
define([
  'angular',
  'controllers/main',
  'directives/dud3',
  ]/*deps*/, 

function (angular, MainCtrl, Dud3Directive)/*invoke*/ {
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
      'rollogApp.directives.Dud3',
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
