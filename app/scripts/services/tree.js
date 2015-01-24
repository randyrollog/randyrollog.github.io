define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc service
   * @name rollogApp.tree
   * @description
   * # tree
   * Factory in the rollogApp.
   */
  angular.module('rollogApp.services.Tree', [])
    .factory('TreeService', function ($http, $q) {
 
      return {
        getData: function () {
          var deferred = $q.defer();

          $http({
              method: 'GET',
              url: '/data/about.json'
          }).
          success(function(data) {
              deferred.resolve(data);
          }).
          error(function(data, status) {
              deferred.reject(status);
          });

          return deferred.promise;
        }
      };
    });
});
