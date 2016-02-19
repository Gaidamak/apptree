angular.module('ChartsApp').controller('filterCtrl', function ($scope, bus) {
    'use strict';

    bus.on('updateData', function(data) {
        $scope.testtypes = computeTestTypes(data);
        $scope.hosts = computeHosts(data);
    });

    $scope.nameFilter = '';

    var testtypesFilter = [];
    var hostsFilter = [];

    $scope.$watch('nameFilter', function(name) {
        bus.emit('nameFilterChange', name);
    });

    $scope.toggleTechnoFilter = function(techno) {
        if ($scope.isTechnoInFilter(techno)) {
            testtypesFilter.splice(testtypesFilter.indexOf(techno), 1);
        } else {
            testtypesFilter.push(techno);
        }
        bus.emit('testtypesFilterChange', testtypesFilter);
    };

    $scope.isTechnoInFilter = function(techno) {
        return testtypesFilter.indexOf(techno) !== -1;
    };

    $scope.toggleHostFilter = function(host) {
        if ($scope.isHostInFilter(host)) {
            hostsFilter.splice(hostsFilter.indexOf(host), 1);
        } else {
            hostsFilter.push(host);
        }
        bus.emit('hostsFilterChange', hostsFilter);
    };

    $scope.isHostInFilter = function(host) {
        return hostsFilter.indexOf(host) !== -1;
    };

    function computeTestTypes(rootNode) {
        var testtypes = [];

        function addNodeTestTypes(node) {
            if (node.testtypes) {
                node.testtypes.forEach(function(techno) {
                    testtypes[techno] = true;
                });
            }
            if (node.children) {
                node.children.forEach(function(childNode) {
                    addNodeTestTypes(childNode);
                });
            }
        }

        addNodeTestTypes(rootNode);

        return Object.keys(testtypes).sort();
    }

    function computeHosts(rootNode) {
        var hosts = {};

        function addNodeHosts(node) {
            if (node.host) {
                for (var i in node.host) {
                    hosts[i] = true;
                }
            }
            if (node.children) {
                node.children.forEach(function(childNode) {
                    addNodeHosts(childNode);
                });
            }
        }

        addNodeHosts(rootNode);

        return Object.keys(hosts).sort();
    }

});
