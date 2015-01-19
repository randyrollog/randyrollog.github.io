define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name rollogApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the rollogApp
   */
  angular.module('rollogApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', function ($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
});
