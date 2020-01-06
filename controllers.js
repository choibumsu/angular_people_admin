angular.module('people').controller('PeopleCtrl', function($scope, peopleStorage) {
  $scope.showAdd = false;
  $scope.addable = true;
  $scope.valueErrorMsg = "";
  $scope.people = peopleStorage.get();

  $scope.updatePageNums = function (startPageNum) {
    $scope.pageNums = [];
    for(var i = startPageNum - 1; i < $scope.people.length / 10; i++) {
      $scope.pageNums.push(i + 1);
      if($scope.pageNums.length == 10) 
        break;
    }
  };
  $scope.currPageNum = 1;
  $scope.updatePageNums($scope.currPageNum);
  $scope.startIndex = 0;
  $scope.endIndex = 9;

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
  
  $scope.update = function (person) {
    if($scope.validatePerson(person) == false) {
      $scope.updatable = false;
    }

    peopleStorage.update();
  };

  $scope.excelDownload = function () {
    peopleStorage.excelDownload();
  };

  $scope.showAddSection = function () {
    $scope.showAdd = true;
  };

  $scope.hideAddSection = function () {
    $scope.showAdd = false;
  };

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
  };

  $scope.movePage = function (pageNum) {
    $scope.startIndex = (pageNum - 1) * 10;
    $scope.endIndex = pageNum * 10 - 1;
    $scope.currPageNum = pageNum;
  };

  $scope.prePage = function () {
    var startPageNum = $scope.pageNums[0];

    if(startPageNum - 10 < 0) {
      return;
    }
    startPageNum -= 10;
    $scope.updatePageNums(startPageNum);
    $scope.movePage($scope.pageNums[$scope.pageNums.length - 1]);
  }

  $scope.nextPage = function () {
    var startPageNum = $scope.pageNums[0];

    if(startPageNum + 10 > $scope.people.length / 10) {
      return;
    }
    startPageNum += 10;
    $scope.updatePageNums(startPageNum);
    $scope.movePage($scope.pageNums[0]);
  }
});