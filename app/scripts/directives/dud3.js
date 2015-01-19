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
    .directive('dud3', function () {
      return {
        restrict: 'EA',
        link: function postLink() {

          var links = [
            {source: 'John', target: 'Mike', group: '5'},
            {source: 'John', target: 'Janice', group: '5'},
            {source: 'John', target: 'Caleb', group: '5'},
            {source: 'John', target: 'Anna', group: '4'},
            {source: 'John', target: 'Tommy', group: '3'},
            {source: 'John', target: 'Jack', group: '2'},
            {source: 'John', target: 'Vilma', group: '1'},
          ];

          var nodes = {};

          function tick() {
            link
              .attr('x1', function(d) { return d.source.x; })
              .attr('y1', function(d) { return d.source.y; })
              .attr('x2', function(d) { return d.target.x; })
              .attr('y2', function(d) { return d.target.y; });

            node
              .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
          }

          // Compute the distinct nodes from the links.
          links.forEach(function(link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
          });

          d3.scale.category20();

          var linkDistanceVal = 200;
          var chargeVal = -(linkDistanceVal * links.length);

          var width = 805,
              height = 500;

          var force = d3.layout.force()
              .nodes(d3.values(nodes))
              .links(links)
              .size([width, height])
              .linkDistance(linkDistanceVal)
              .charge(chargeVal)
              .on('tick', tick)
              .start();

          var svg = d3.select('#d3-wrapper').append('svg')
              .attr('width', width)
              .attr('height', height);

          var link = svg.selectAll('.link')
              .data(force.links())
              .enter().append('line')
              .attr('class', 'link');

          var node = svg.selectAll('.node')
              .data(force.nodes())
              .enter().append('g')
              .attr('class', 'node')
              .style('fill', '#F0B67F')
             // .on('mouseover', mouseover)
             // .on('mouseout', mouseout)
              .call(force.drag);

          node.append('circle')
              .attr('r', 30);

          node.append('text')
              .attr('x', 35)
              .attr('dy', '.55em')
              .text(function(d) { return d.name; })
              .style('fill', '#2E282A');
              
        }
      };
    });
});