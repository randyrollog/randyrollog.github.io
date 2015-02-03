define(['angular', 'prism'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rollogApp.directive:editor
   * @description
   * # editor
   */
  angular.module('rollogApp.directives.Editor', [])
    .directive('editor', function ($rootScope, TreeService, $timeout) {
      return {
        templateUrl: 'templates/editor.html',
        restrict: 'EA',
        link: function(scope) {
          

          var initEditor = function(){

            scope.setInitCategory();

          };

          scope.setInitCategory = function() {

            scope.category = 'default';
            scope.highlightPrism();

          };

          scope.$on('setCategory', function(evt, name){

            console.log('name', name);

            if(!name || name === 'undefined' || name === null) {
              scope.category = 'default';

              console.log('scope.category', scope.category);
            } else {
              scope.tmpCategory = name;

              scope.category = name;
              scope.highlightPrism();

            }

          });

          var timer;

          scope.stopHighlight = function(){
            console.log('stopping?');

            // $interval.cancel(timer);
            // timer = undefined;

          };

          scope.highlightPrism = function() {            

            // Prism.highlightAll();

            timer = $timeout(function(){


              /* jshint ignore:start */
              // TODO fix timeout requests to the DOM
              if(Prism.highlightAll) {
                
                Prism.highlightAll();
                // scope.stopHighlight();

              }
              /* jshint ignore:end */

            }, 200);



          };

          scope.$on(
              '$destroy',
              function() {

                  $timeout.cancel( timer );

              }
          );

          
          

          // scope.$watch('categoryItems', function(newItems, oldItems){

          //   scope.categoryItems = newItems;
          //   // scope.updateCatItems(newItems);

          // });

          // var items = [];

          // scope.updateCatItems = function(catItems) {

          //   angular.copy(catItems, items);

          // };

          // scope.showMarkup = function(data) {
          //   scope.$apply(function(scope){
          //     scope.categoryItems = data.children;  
          //   });
            
          //   console.log(scope.categoryItems);

          //   // console.log('d', d);

          // };

          // scope.$watch('categoryItems', function(){
          //   console.log(msg)
          // });

          initEditor();

        }
      };
    });
});
