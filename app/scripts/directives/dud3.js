define([
  'angular', 
  'd3'
  ], function (angular, d3) {
  'use strict';

  /**
   * @ngdoc directive
   * @name rollogApp.directive:dud3
   * @description
   * # dud3
   */

  angular.module('rollogApp.directives.Dud3', [])
    .directive('sunDud3', function () {
      return {
        restrict: 'EA',
        link: function postLink(scope) {

          var diameter = 500,
              radius = diameter / 2 - 120;

          var tree = d3.layout.tree()
              .size([360, radius])
              .separation(function(a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });

          var diagonal = d3.svg.diagonal.radial()
              .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

          var svg = d3.select('#d3-wrapper')
              .append('svg')
              .attr('width', diameter)
              .attr('height', diameter)
              .append('g')
              .attr('transform', 'translate(' + diameter / 2 + ',' + diameter / 2 + ')');


          var counter = 0;
          var prevIndex;
          var dataArray = [];

          scope.filterResults = function(dataset) {
            var dataIndex = dataset - 1;
            var lastIndex;
            dataArray.push(dataIndex)

            if(dataArray.length > 2) {
              dataArray.shift();
            }

            d3.json('../../data/about.json', function(error, root) {

              // if(counter > 0) {
              //   var prevIndex = dataArray[0];
              //   console.log('prevIndex', prevIndex);

              //   var circle = svg.selectAll('circle')
              //     .data(tree.nodes(root[prevIndex]));

              //     // circleLinks = tree.links(circle);
              //     // .data(tree.links(tree.nodes(root[prevIndex])));
              //     // .data(dataset[0])
              //     circle.exit().remove();
              // }

              
              var nodes = tree.nodes(root[dataIndex]).reverse(),
                  links = tree.links(nodes);

              var link = svg.selectAll('.link')
                  .data(links)
                  .enter().append('path')
                  .attr('class', 'link')
                  .attr('d', diagonal);

              var node = svg.selectAll('.node')
                  .data(nodes)
                  .enter().append('g')
                  .attr('class', 'node')
                  .attr('transform', function(d) { return 'rotate(' + (d.x - 90) + ')translate(' + d.y + ')'; });

              node.append('circle')
                  .attr('r', 4.5);

              node.append('text')
                  .attr('dy', '.31em')
                  .attr('text-anchor', function(d) { return d.x < 180 ? 'start' : 'end'; })
                  .attr('transform', function(d) { return d.x < 180 ? 'translate(8)' : 'rotate(180)translate(-8)'; })
                  .text(function(d) { return d.name; });

              counter++;

              console.log('dataArray', dataArray);

            });

          };

          d3.select(self.frameElement).style('height', diameter - 150 + 'px');

          // svg.on('drag', moveArcSelector);
              
        }
      };
    });
});