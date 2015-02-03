define(['angular'], function (angular) {
  'use strict';

  angular.module('rollogApp.directives.BackBtn', [])
    .directive('backBtn', function ($window) {
      return {
        templateUrl: 'templates/back-btn.html',
        restrict: 'E',
        link: function (scope, elem) {
          
          elem.on('click', function() {
            $window.history.back();
          });

        }
      };
    });
});
