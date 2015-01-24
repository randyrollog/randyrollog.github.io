define(['angular', 'svg'], function (angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rollogApp.directive:tree
   * @description
   * # tree
   */
  angular.module('rollogApp.directives.Tree', [])
    .directive('tree', function ($timeout, TreeService) {
      return {
        templateUrl: 'templates/tree.html',
        restrict: 'A',
        link: function() {

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

              console.log(data);

              // init values
              var draw = self.tree,
                  parentText = draw.text('click'),
                  baseWidth = 1170,
                  containerWidth = document.getElementById('tree').offsetWidth,
                  parentLineLength = containerWidth >= 615 ? 420 + 10 : (800 * containerWidth)/baseWidth + 10;

              self.initData.branchOne.distance = (parentLineLength - 10) / 4;

              parentText.click(function() {

                self.openBranchOne(parentLineLength);

              });

            },

            openBranchOne: function(verticalLength) {

              var self = this,
                  draw = self.tree,
                  b1 = self.initData.branchOne,
                  hDistance = self.initData.branchOne.distance;

              // draw main parent branch line
              b1.parentLine = draw.polyline([[20, 30]]).fill('none').stroke({ width: 3 });
              b1.parentLine.animate(400, '>').plot([[20, 30], [20, 30 + verticalLength]]);

              // draw horizontal lines
              b1.hLineOne = draw.polyline([[20, 40 + hDistance]]).fill('none').stroke({ width: 3 });
              b1.hLineOne.animate(300, '>', 400).plot([[20, 40 + hDistance], [80, 40 + hDistance]]);

              b1.hLineTwo = draw.polyline([[20, 40 + (hDistance * 2)]]).fill('none').stroke({ width: 3 });
              b1.hLineTwo.animate(300, '>', 400).plot([[20, 40 + (hDistance * 2)], [80, 40 + (hDistance * 2)]]);

              b1.hLineThree = draw.polyline([[20, 40 + (hDistance * 3)]]).fill('none').stroke({ width: 3 });
              b1.hLineThree.animate(300, '>', 400).plot([[20, 40 + (hDistance * 3)], [80, 40 + (hDistance * 3)]]);

              b1.hLineFour = draw.polyline([[20, 40 + (hDistance * 4)]]).fill('none').stroke({ width: 3 });
              b1.hLineFour.animate(300, '>', 400).plot([[20, 40 + (hDistance * 4)], [80, 40 + (hDistance * 4)]]);

              $timeout(function(){
                self.showCategories(hDistance);
              }, 750);

            },
            showCategories: function(horizontal){

              var self = this,
                  draw = self.tree,
                  treeData = self.treeData;

              var ptext = draw.text(treeData[0].name).opacity(0),
                  stext = draw.text(treeData[1].name).opacity(0),
                  btext = draw.text(treeData[2].name).opacity(0),
                  itext = draw.text(treeData[3].name).opacity(0);
              

              ptext.move(80 + 5, 30 + (horizontal * 1)).animate(400).opacity(1);
              stext.move(80 + 5, 30 + (horizontal * 2)).animate(400).opacity(1);
              btext.move(80 + 5, 30 + (horizontal * 3)).animate(400).opacity(1);
              itext.move(80 + 5, 30 + (horizontal * 4)).animate(400).opacity(1);

              ptext.click(function(){

                self.openBranchTwo();

              });

            },
            openBranchTwo: function() {
              var self = this,
                  draw = self.tree,
                  treeData = self.treeData;

              var dataLength = treeData[0].children.length;

              console.log('msg', dataLength);

              var vLineTwo = draw.polyline([[120, 160]]).fill('none').stroke({ width: 3 });
              vLineTwo.animate(150, '>').plot([[120, 160], [120, 200]]);

              var hLineOne = draw.polyline([[120, 200]]).fill('none').stroke({ width: 3 });
              hLineOne.animate(150, '>', 150).plot([[120, 200], [200, 200]]);

              var vLineThree = draw.polyline([[200, 200]]).fill('none').stroke({ width: 3 });
              vLineThree.animate(150, '>', 300).plot([[200, 200], [200, 460]]);

            }

          };

          

          

          // parentText.click(function() {
          //   var b1 = initData.branchOne,
          //       hDistance = initData.branchOne.distance;

          //   // draw main parent branch line
          //   b1.parentLine = draw.polyline([[20, 30]]).fill('none').stroke({ width: 3 });
          //   b1.parentLine.animate(400, '>').plot([[20, 30], [20, 30 + parentLineLength]]);

          //   // draw horizontal lines
          //   b1.hLineOne = draw.polyline([[20, 40 + hDistance]]).fill('none').stroke({ width: 3 });
          //   b1.hLineOne.animate(300, '>', 400).plot([[20, 40 + hDistance], [80, 40 + hDistance]]);

          //   b1.hLineTwo = draw.polyline([[20, 40 + (hDistance * 2)]]).fill('none').stroke({ width: 3 });
          //   b1.hLineTwo.animate(300, '>', 400).plot([[20, 40 + (hDistance * 2)], [80, 40 + (hDistance * 2)]]);

          //   b1.hLineThree = draw.polyline([[20, 40 + (hDistance * 3)]]).fill('none').stroke({ width: 3 });
          //   b1.hLineThree.animate(300, '>', 400).plot([[20, 40 + (hDistance * 3)], [80, 40 + (hDistance * 3)]]);

          //   b1.hLineFour = draw.polyline([[20, 40 + (hDistance * 4)]]).fill('none').stroke({ width: 3 });
          //   b1.hLineFour.animate(300, '>', 400).plot([[20, 40 + (hDistance * 4)], [80, 40 + (hDistance * 4)]]);

          //   // $timeout(function(){
          //   //   toggleDropdown();
          //   // }, 750);

          // });

          // var toggleDropdown = function(event) {
          //   // event.preventDefault();
          //   var ptext = draw.text(skillsData.second[0]).opacity(0),
          //       stext = draw.text(skillsData.second[1]).opacity(0),
          //       btext = draw.text(skillsData.second[2]).opacity(0),
          //       itext = draw.text(skillsData.second[3]).opacity(0);
            

          //   ptext.move(80 + 5, 150 - 8).animate(400).opacity(1);
          //   stext.move(80 + 5, 250 - 8).animate(400).opacity(1);
          //   btext.move(80 + 5, 350 - 8).animate(400).opacity(1);
          //   itext.move(80 + 5, 450 - 8).animate(400).opacity(1);

          //   ptext.click(function(){

          //     var vLineTwo = draw.polyline([[120, 160]]).fill('none').stroke({ width: 3 });
          //     vLineTwo.animate(150, '>').plot([[120, 160], [120, 200]]);

          //     var hLineOne = draw.polyline([[120, 200]]).fill('none').stroke({ width: 3 });
          //     hLineOne.animate(150, '>', 150).plot([[120, 200], [180, 200]]);

          //     var vLineThree = draw.polyline([[180, 200]]).fill('none').stroke({ width: 3 });
          //     vLineThree.animate(150, '>', 300).plot([[180, 200], [180, 460]]);

          //     var vLineThree = draw.polyline([[180, 200]]).fill('none').stroke({ width: 3 });
          //     vLineThree.animate(150, '>', 300).plot([[180, 200], [180, 0]]);

          //   });

          // };

          
        }
      };
    });
});
