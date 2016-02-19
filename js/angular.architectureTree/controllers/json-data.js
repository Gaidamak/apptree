angular.module('ChartsApp').controller('jsonDataCtrl', function ($scope, bus, data) {
    'use strict';

    console.log(arguments)
    var previousData;

    bus.on('updateData', function(data) {
        if (previousData) bus.emit('saveData', JSON.stringify(data, undefined, 2))
        previousData = data;
        $scope.data = JSON.stringify(data, undefined, 2);
    });

    $scope.updateData = function() {
        var newData = JSON.parse($scope.data);
        if (!angular.equals(newData, previousData)) {
            data.setJsonData(newData);
        }
    };

});
