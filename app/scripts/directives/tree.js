define(['angular', 'svg', 'prism'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rollogApp.directive:tree
   * @description
   * # tree
   */
  angular.module('rollogApp.directives.Tree', [])
    .directive('tree', function ($timeout, TreeService, $window) {
      return {
        templateUrl: 'templates/tree.html',
        restrict: 'A',
        link: function(scope) {
          
          // grab data from service
          var promise = TreeService.getData();
          promise
            .then(function(resp){
              initTreeData(resp);
            });

          // make data available
          var initTreeData = function(data) {

            var treeModule = new Tree();
            treeModule.init(data);

          };

          var Tree = function() {
            var self = this;
            self.tree = SVG('tree');

            self.initData = {
              branchOne: {},
              branchTwo: {}
            };

          };

          Tree.prototype = {

            init: function(data) {

              var self = this;

              self.treeData = data;
              scope.treeData = data;
              self.open = false;

              // init values
              var draw = self.tree,
                  parentGroup = draw.group().attr('class', 'parent-folder'),
                  parentTriangle = parentGroup.polygon('1.669,1.927 10.33,6.928 1.669,11.927').fill('#BD454A'),
                  parentIcon = parentGroup.path('M58.601,39.991h-9.84v-0.729c0-0.422-0.316-0.762-0.745-0.762H41.65 c-0.431,0-0.744,0.343-0.744,0.763v0.002v12.422v0.003c0,0.169,0.09,0.31,0.219,0.396c0.08,0.056,0.172,0.096,0.276,0.096h1.44 v-0.003h15.76c0.273,0,0.492-0.216,0.492-0.489v-8.413v-2.792C59.094,40.212,58.876,39.991,58.601,39.991z').attr({'fill': '#FFF', 'stroke': '#DAD7CD', 'stroke-miterlimit': '10'}),
                  parentText = parentGroup.text('randy rollog').font({ family: 'Montserrat', color: '#4D484C', size: '12px', 'font-weight': 200 }),
                  baseWidth = 1170,
                  containerWidth = document.getElementById('tree').offsetWidth,
                  parentLineLength = containerWidth >= 615 ? 420 + 10 : (800 * containerWidth)/baseWidth + 10;

              self.initData.branchOne.distance = (parentLineLength - 10) / 4;

              parentTriangle.move(0, 8);
              parentIcon.move(17, 6);
              parentText.move(43, 5);
              parentTriangle.addClass('parent-folder');
              parentIcon.addClass('parent-folder');
              parentText.addClass('parent-folder');

              var parentFolder = document.querySelector('.parent-folder');

              parentFolder.addEventListener('click', function(){
                self.openBranchOne();
              }, false);

            },

            openBranchOne: function() {

              var self = this,
                  draw = self.tree,
                  b1 = self.initData.branchOne,
                  hDistance = 53,
                  x1 = 15,
                  x2 = 23,
                  y1 = 40,
                  y2 = 219;

              // draw main parent branch line
              b1.parentLine = draw.polyline([[x1, 30]]).fill('none').stroke({ width: 2, color: '#D2CFD1' });
              b1.parentLine.animate(200, '>').plot([[x1, 30], [x1, y2]]);

              // draw horizontal lines
              for(var i = 0, len = self.treeData.length; i < len; i++) {
                var hLine = draw.polyline([[(x1 - 1), (y1 + 20) + hDistance*i]]).fill('none').stroke({ width: 2, color: '#D2CFD1' });
                hLine.animate(300, '>', 200).plot([[(x1 - 1), (y1 + 20) + hDistance*i], [x2, (y1 + 20) + hDistance*i]]);
              }

              $timeout(function(){
                self.showCategories(x2, y1, hDistance);
              }, 200);

            },

            showCategories: function(startX, startY, horizontal){

              var self = this,
                  draw = self.tree,
                  treeData = self.treeData,
                  bProgramming = draw.group().attr({'class': 'branch-cateogory'}),
                  bSoftware = draw.group().attr('class', 'branch-cateogory'),
                  bClients = draw.group().attr('class', 'branch-cateogory'),
                  bInterests = draw.group().attr('class', 'branch-cateogory');

              var pText = bProgramming.text(treeData[0].name).opacity(0).font({ family: 'Montserrat', color: '#4D484C', size: '12px', 'font-weight': 200 }),
                  sText = bSoftware.text(treeData[1].name).opacity(0).font({ family: 'Montserrat', color: '#4D484C', size: '12px', 'font-weight': 200 }),
                  bText = bClients.text(treeData[2].name).opacity(0).font({ family: 'Montserrat', color: '#4D484C', size: '12px', 'font-weight': 200 }),
                  iText = bInterests.text(treeData[3].name).opacity(0).font({ family: 'Montserrat', color: '#4D484C', size: '12px', 'font-weight': 200 });
              
              var htmlIcon = bProgramming.image($window.location.origin + '/images/svg/html.svg').opacity(0),
                  adobeIcon = bSoftware.image($window.location.origin + '/images/svg/adobe.svg').opacity(0),
                  pieIcon = bClients.image($window.location.origin + '/images/svg/pie.svg').opacity(0),
                  likesIcon = bInterests.image($window.location.origin + '/images/svg/likes.svg').opacity(0);

              htmlIcon.move(startX + 10, startY + 8 + (horizontal * 0)).animate(700).opacity(1);
              adobeIcon.move(startX + 10, startY + 8 + (horizontal * 1)).animate(700).opacity(1);
              pieIcon.move(startX + 10, startY + 8 + (horizontal * 2)).animate(700).opacity(1);
              likesIcon.move(startX + 10, startY + 8 + (horizontal * 3)).animate(700).opacity(1);

              pText.move(startX + 35, startY + 10 + (horizontal * 0)).animate(700).opacity(1);
              sText.move(startX + 35, startY + 10 + (horizontal * 1)).animate(700).opacity(1);
              bText.move(startX + 35, startY + 10 + (horizontal * 2)).animate(700).opacity(1);
              iText.move(startX + 35, startY + 10 + (horizontal * 3)).animate(700).opacity(1);

              bProgramming.click(function(){

                scope.data = 'programming';
                scope.$broadcast('setCategory', scope.data);

              });

              bSoftware.click(function(){

                scope.data = 'software';
                scope.$broadcast('setCategory', scope.data);
              });

              bClients.click(function(){
                
                scope.data = 'clients';
                scope.$broadcast('setCategory', scope.data);
              });

              bInterests.click(function(){

                scope.data = 'interests';
                scope.$broadcast('setCategory', scope.data);
              });

              // pText.click(function(){

              //   self.openBranchTwo();

              // });

            }//,

            // openBranchTwo: function() {
            //   var self = this,
            //       draw = self.tree;//,
            //       // treeData = self.treeData;//,
            //       // b2 = self.initData.branchTwo,
            //       // hDistance = self.initData.branchTwo.distance;

            //   // var dataLength = treeData[0].children.length;

            //   var vLineTwo = draw.polyline([[115, 160]]).fill('none').stroke({ width: 3, color: '#4D484C' });
            //   vLineTwo.animate(150, '>').plot([[120, 160], [120, 200]]);

            //   var hLineOne = draw.polyline([[120, 200]]).fill('none').stroke({ width: 3, color: '#4D484C' });
            //   hLineOne.animate(150, '>', 150).plot([[120, 200], [200, 200]]);

            //   var vLineThree = draw.polyline([[200, 200]]).fill('none').stroke({ width: 3, color: '#4D484C' });
            //   vLineThree.animate(150, '>', 300).plot([[200, 200], [200, 460]]);

            //   var vLineFour = draw.polyline([[200, 200]]).fill('none').stroke({ width: 3, color: '#4D484C' });
            //   vLineFour.animate(150, '>', 300).plot([[200, 200], [200, 0]]);

            //   var totalLength = 460;

            //   for(var i = 0, len = self.treeData[0].children.length; i < len; i++) {
            //     var hLine = draw.polyline([[200, (totalLength/len) * (i+1)]]).fill('none').stroke({ width: 3, color: '#4D484C' });
            //     hLine.animate(300, '>', 400).plot([[200, (totalLength/len) * (i+1)], [280, (totalLength/len) * (i+1) ]]);
            //   }


            // }

          };
          
        }
      };
    });
});
