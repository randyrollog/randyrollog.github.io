define(['angular', 'svg'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rollogApp.directive:tree
   * @description
   * # tree
   */
  angular.module('rollogApp.directives.Tree', [])
    .directive('tree', function ($timeout) {
      return {
        templateUrl: 'templates/tree.html',
        restrict: 'A',
        link: function(scope) {
          
          var draw = SVG('tree');

          scope.hidden = true;

          scope.toggleBranch = function() {

            var vDistance = 53,
                x1 = 20,
                x2 = 28,
                y1 = 30,
                y2 = 209,
                arrow = document.querySelector('.parent-folder .arrow');

            if(scope.hidden) {
              
              arrow.style.webkitTransform = 'rotate(90deg)';
              arrow.style.mozTransform    = 'rotate(90deg)';
              arrow.style.mozTransform    = 'rotate(90deg)';
              arrow.style.oTransform      = 'rotate(90deg)';
              arrow.style.transform       = 'rotate(90deg)';
              // var aArrow = angular.element(arrow);
              // aArrow.addClass('active');

              // draw main parent branch line
              var parentLine = draw.polyline([[x1, 5]]).fill('none').stroke({ width: 2, color: '#D2CFD1' });
              parentLine.animate(200, '>').plot([[x1, 5], [x1, y2]]);

              // draw horizontal lines
              for(var i = 0, len = 4; i < len; i++) {
                var hLine = draw.polyline([[(x1 - 1), (y1 + 20) + vDistance*i]]).fill('none').stroke({ width: 2, color: '#D2CFD1' });
                hLine.animate(300, '>', 200).plot([[(x1 - 1), (y1 + 20) + vDistance*i], [x2, (y1 + 20) + vDistance*i]]);
              }

              $timeout(function(){
                scope.hidden = false;
              }, 200);

            } else {

              var coverParentLine, coverHLine;

              arrow.style.webkitTransform = 'rotate(0deg)';
              arrow.style.mozTransform    = 'rotate(0deg)';
              arrow.style.mozTransform    = 'rotate(0deg)';
              arrow.style.oTransform      = 'rotate(0deg)';
              arrow.style.transform       = 'rotate(0deg)';

              // draw main parent branch line
              coverParentLine = draw.polyline([[x1, y2]]).fill('none').stroke({ width: 2, color: '#FFF' });
              coverParentLine.animate(200, '>', 300).plot([[x1, y2], [x1, 5]]).attr({ fill: '#FFF' });

              // draw horizontal lines
              for(var ci = 0, clen = 4; ci < clen; ci++) {
                coverHLine = draw.polyline([[x2, (y1 + 20) + vDistance*ci]]).fill('none').stroke({ width: 2, color: '#FFF' });
                coverHLine.animate(300, '>').plot([[x2, (y1 + 20) + vDistance*ci], [(x1 + 1), (y1 + 20) + vDistance*ci]]);
              }

              $timeout(function(){
                scope.hidden = true;
              }, 200);

            }

          };

          scope.selectCategory = function(title, $event) {

            var cat = $event.target.attributes['data-category'].value,
                li = document.querySelector('li[data-category="' + cat + '"]'),
                all = document.querySelectorAll('.categories-wrapper li');

            if(li.className === 'active') {
              return;
            }  


            for(var i = 0; i < all.length; ++i) {
              all[i].className = '';
            }

            li.className = 'active';

            scope.data = title;
            scope.$broadcast('setCategory', scope.data);

          };
          
        }

      };

    });

});
