/*jshint unused: vars */
define([
  'angular',
  'controllers/main-controller',
  'directives/tree', 
  'directives/editor',
  'services/tree'
  ]/*deps*/, 

function (angular, MainCtrl, TreeDirective, EditorDirective, TreeFactory)/*invoke*/ {
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
      'rollogApp.directives.Tree',
      'rollogApp.directives.Editor',
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
