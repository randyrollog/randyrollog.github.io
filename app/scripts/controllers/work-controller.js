define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name rollogApp.controller:WorkCtrl
   * @description
   * # WorkCtrl
   * Controller of the rollogApp
   */
  angular.module('rollogApp.controllers.WorkCtrl', [])
    .controller('WorkCtrl', function ($scope) {
      
      $scope.works = [
        {
          'title': 'brands',
          'type': '50+ web apps',
          'image': '1_front.png',
          'path': 'brands'
        }, 
        {
          'title': 'cronies - follow to download',
          'type': 'web app',
          'image': '2_front.png',
          'path': 'cronies'
        },
        {
          'title': 'svg animations & interactions',
          'type': 'svg demo',
          'image': '3_front.png',
          'path': 'svg'
        }, 
        {
          'title': 'raquel riturban, real estate agent',
          'type': 'web app',
          'image': '4_front.png',
          'path': 'raquelriturban'
        }, 
        {
          'title': 'hear here',
          'type': 'web app',
          'image': '3_front.png',
          'path': 'hearhere'
        }, 
        {
          'title': 'pausm',
          'type': 'web app',
          'image': '1_front.png',
          'path': 'pausm'
        }
      ];


    });
});
