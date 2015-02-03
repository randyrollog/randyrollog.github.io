/*jshint unused: vars */
define([
  'angular',
  'controllers/main-controller',
  'directives/tree', 
  'directives/editor',
  'directives/back-btn',
  'services/tree',
  'controllers/work-controller'
]/*deps*/, 

function (angular, MainCtrl, TreeDirective, EditorDirective, TreeFactory, WorkCtrl, BackBtn)/*invoke*/ {
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
      'rollogApp.directives.BackBtn',
      'rollogApp.services.Tree',
      'rollogApp.controllers.WorkCtrl',
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
        .when('/works/brands', {
          templateUrl: 'views/works/brands.html',
          // controller: 'WorksCtrl'
        })
        .when('/works/cronies', {
          templateUrl: 'views/works/cronies.html',
          // controller: 'WorksCtrl'
        })
        .when('/works/svg', {
          templateUrl: 'views/works/svg.html',
          // controller: 'WorksCtrl'
        })
        .when('/works/raquelriturban', {
          templateUrl: 'views/works/raquelriturban.html',
          // controller: 'WorksCtrl'
        })
        .when('/works/hearhere', {
          templateUrl: 'views/works/hearhere.html',
          // controller: 'WorksCtrl'
        })
        .when('/works/pausm', {
          templateUrl: 'views/works/pausm.html',
          // controller: 'WorksCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});
