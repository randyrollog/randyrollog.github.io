/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Directive: sundud3', function () {

    // load the directive's module
    beforeEach(module('rollogApp.directives.Sundud3'));

    var element,
      scope;

    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<sundud3></sundud3>');
      element = $compile(element)(scope);
      expect(element.text()).toBe('this is the sundud3 directive');
    }));
  });
});
