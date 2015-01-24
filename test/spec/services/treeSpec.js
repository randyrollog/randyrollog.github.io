/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Service: tree', function () {

    // load the service's module
    beforeEach(module('rollogApp.services.Tree'));

    // instantiate service
    var tree;
    beforeEach(inject(function (_tree_) {
      tree = _tree_;
    }));

    it('should do something', function () {
      expect(!!tree).toBe(true);
    });

  });
});
