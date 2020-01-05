angular.module('todo').controller('TodoCtrl', function($scope, todoStorage) {
  $scope.showAdd = false;
  $scope.people = todoStorage.get();
  
  $scope.remove = function() {
    todoStorage.remove();
  }
  
  $scope.add = function (newPerson) {
    todoStorage.add(newPerson);
    $scope.newPerson = {};
  };
  
  $scope.update = function () {
    todoStorage.update();
  }

  $scope.showAddSection = function () {
    $scope.showAdd = true;
  }

  $scope.hideAddSection = function () {
    $scope.showAdd = false;
  }
});