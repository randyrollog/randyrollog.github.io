define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name rollogApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the rollogApp
   */

  angular.module('rollogApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope) {

      var date = new Date(),
          currentHour = date.getHours(),
          currentGreeting,
          greeting = ['morning', 'afternoon', 'evening'];
      
      $scope.initGreeting = function() {
        $scope.getGreetingType();
      };

      $scope.getGreetingType = function() {
        // TODO convert to switch statement

        if(currentHour >= 5 && currentHour < 12) {
          currentGreeting = greeting[0];
        }

        if(currentHour >= 12 && currentHour < 17) {
          currentGreeting = greeting[1];
        }

        if(currentHour >= 0 && currentHour < 5) {
          currentGreeting = greeting[2];
        }

        if(currentHour >= 17 && currentHour < 25) {
          currentGreeting = greeting[2];
        }


      };
      
      $scope.initGreeting();

      $scope.currentGreeting = currentGreeting;
    
    });
});
