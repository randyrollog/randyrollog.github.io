/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Directive: dud3', function () {

    // load the directive's module
    beforeEach(module('rollogApp.directives.Dud3'));

    var element,
      scope;

    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<dud3></dud3>');
      element = $compile(element)(scope);
      expect(element.text()).toBe('this is the dud3 directive');
    }));
  });
});
