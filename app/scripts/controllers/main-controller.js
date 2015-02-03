define(['angular', 'velocity'], function (angular, Velocity) {
  'use strict';

  /**
   * @ngdoc function
   * @name rollogApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the rollogApp
   */

  angular.module('rollogApp.controllers.MainCtrl', [])
    .controller('MainCtrl', function ($scope, $rootScope, TreeService, $window) {

      // greet the viewer
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

      $scope.navArrow = function() {
        var width = $window.innerWidth;
            
        var offset = width >= 768 ? -50 : -10,
            dur = width >= 768 ? 375 : 520,
            treeId = width >= 768 ? document.getElementById('nav-tree') : document.getElementById('m-nav-tree');

        Velocity.animate(treeId, 'scroll', { duration: dur, offset: offset, easing: 'easeInOutCubic' });

      };
      
      $scope.initGreeting();

      $scope.currentGreeting = currentGreeting;

      // grab data from service
      var promise = TreeService.getData();
      promise
        .then(function(resp){
          $scope.treeData = resp;
        });
      
    });
});
