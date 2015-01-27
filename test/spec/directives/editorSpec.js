/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Directive: editor', function () {

    // load the directive's module
    beforeEach(module('rollogApp.directives.Editor'));

    var element,
      scope;

    beforeEach(inject(function ($rootScope) {
      scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
      element = angular.element('<editor></editor>');
      element = $compile(element)(scope);
      expect(element.text()).toBe('this is the editor directive');
    }));
  });
});
