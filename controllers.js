angular.module('people').controller('PeopleCtrl', function($scope, peopleStorage) {
  $scope.showAdd = false;
  $scope.addable = true;
  $scope.valueErrorMsg = "";
  $scope.people = peopleStorage.get();

  $scope.initNewPerson = function () {
    return {
        name: "",
        gender: "",
        age: 0,
        address: "",
    }
  };
  $scope.newPerson = $scope.initNewPerson();
  
  $scope.remove = function() {
    peopleStorage.remove();
  };
  
  $scope.add = function (newPerson) {
    if($scope.validatePerson(newPerson)) {
      $scope.addable = true;
      peopleStorage.add(newPerson);
      $scope.newPerson = $scope.initNewPerson();
    }
    else
      $scope.addable = false;
  };
  
  $scope.update = function () {
    peopleStorage.update();
  }

  $scope.showAddSection = function () {
    $scope.showAdd = true;
  }

  $scope.hideAddSection = function () {
    $scope.showAdd = false;
  }

  $scope.validatePerson = function (person) {
    if(person.name.length == 0) {
      $scope.valueErrorMsg = "이름을 입력해주세요.";
      return false;
    }
    else if(person.gender != "남" && person.gender != "여") {
      $scope.valueErrorMsg = "성별은 '남' 혹은 '여'로 입력해주세요.";
      return false;
    }
    else if(person.age.length == 0 || parseInt(person.age) <= 0 || parseInt(person.age) > 100) {
      $scope.valueErrorMsg = "나이를 잘못 입력하셨습니다.";
      return false;
    }
    else if(person.address.length == 0) {
      $scope.valueErrorMsg = "거주지를 입력해주세요.";
      return false;
    }
    return true;
  }
});