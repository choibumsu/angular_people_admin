angular.module('people').controller('PeopleCtrl', function($scope, peopleStorage) {
  $scope.queryName = "";
  $scope.showAdd = false;
  $scope.addable = true;
  $scope.addErrorMsg = "";
  $scope.updatable = true;
  $scope.showUpdateError = false;
  $scope.updateErrorMsg = "";
  $scope.people = peopleStorage.get();

  $scope.updatePageNums = function (startPageNum) {
    $scope.pageNums = [];

    if($scope.queryName != "") {
      var peopleLength = $scope.people.filter(person => person.name.includes($scope.queryName)).length;
    }
    else {
      var peopleLength = $scope.people.length;
    }
    for(var i = startPageNum - 1; i < peopleLength / 10; i++) {
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
    if(peopleStorage.remove() == true) {
      $scope.updatable = true;
      $scope.showUpdateError = false;
      $scope.updateErrorMsg = "";
      $scope.updatePageNums(1);
      if($scope.startIndex == $scope.people.length)
        $scope.movePage($scope.currPageNum - 1);
    }
  };
  
  $scope.add = function (newPerson) {
    validateResult = $scope.validatePerson(newPerson);
    if(validateResult === true) {
      $scope.addable = true;
      peopleStorage.add(newPerson);
      $scope.newPerson = $scope.initNewPerson();
    }
    else {
      $scope.addErrorMsg = validateResult;
      $scope.addable = false;
    }
  };

  $scope.prepareUpdate = function (person) {
    if($scope.updatable) {
      person.updatable = true;
      $scope.updatable = false;
    }
    else {
      $scope.updateErrorMsg = "현재 진행중인 수정을 완료해주세요.";
      $scope.showUpdateError = true;
    }
  };
  
  $scope.update = function (person) {
    validateResult = $scope.validatePerson(person);
    if(validateResult === true) {
      person.updatable = false;
      $scope.updatable = true;
      peopleStorage.update();
      $scope.showUpdateError = false;
    }
    else {
      $scope.updateErrorMsg = validateResult;
      $scope.updatable = false;
      $scope.showUpdateError = true;
    }
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
      return "이름을 입력해주세요.";
    }
    else if(person.gender != "남" && person.gender != "여") {
      return "성별은 '남' 혹은 '여'로 입력해주세요.";
    }
    else if(person.age.length == 0 || parseInt(person.age) <= 0 || parseInt(person.age) > 100) {
      return "나이를 잘못 입력하셨습니다.";
    }
    else if(person.address.length == 0) {
      return "거주지를 입력해주세요.";
    }
    return true;
  };

  $scope.checkPageMovable = function () {
    if($scope.updatable == false) {
      $scope.updateErrorMsg = "현재 진행중인 수정을 완료해주세요.";
      $scope.showUpdateError = true;
      return false;
    }
    return true;
  }

  $scope.movePage = function (pageNum) {
    if($scope.checkPageMovable() == false) return;

    $scope.startIndex = (pageNum - 1) * 10;
    $scope.endIndex = pageNum * 10 - 1;
    $scope.currPageNum = pageNum;
  };

  $scope.prePage = function () {
    if($scope.checkPageMovable() == false) return;
    var startPageNum = $scope.pageNums[0];

    if(startPageNum - 10 < 0) {
      return;
    }
    startPageNum -= 10;
    $scope.updatePageNums(startPageNum);
    $scope.movePage($scope.pageNums[$scope.pageNums.length - 1]);
  }

  $scope.nextPage = function () {
    if($scope.checkPageMovable() == false) return;
    var startPageNum = $scope.pageNums[0];

    if(startPageNum + 10 > $scope.people.length / 10) {
      return;
    }
    startPageNum += 10;
    $scope.updatePageNums(startPageNum);
    $scope.movePage($scope.pageNums[0]);
  }
});