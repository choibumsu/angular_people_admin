angular.module('people').factory('peopleStorage', function () {
  var PEOPLE_DATA = 'PEOPLE_DATA';
  var storage = {
    people: [
      {
        name: "최범수",
        gender: "남",
        age: 25,
        address: "서울시 용산구",
        checked: false,
        updatable : false,
      },
      {
        name: "유인근",
        gender: "남",
        age: 25,
        address: "서울시 동작구",
        checked: false,
        updatable : false,
      },
      {
        name: "김정빈",
        gender: "남",
        age: 25,
        address: "서울시 동작구",
        checked: false,
        updatable : false,
      },
      {
        name: "조원희",
        gender: "남",
        age: 26,
        address: "서울시 동작구",
        checked: false,
        updatable : false,
      },
      {
        name: "이성민",
        gender: "여",
        age: 23,
        address: "서울시 동작구",
        checked: false,
        updatable : false,
      },
      {
        name: "정모세",
        gender: "남",
        age: 25,
        address: "경기도 수원시",
        checked: false,
        updatable : false,
      },
      {
        name: "조종현",
        gender: "남",
        age: 25,
        address: "서울시 동작구",
        checked: false,
        updatable : false,
      }
    ],
    
    _saveToLocalStorage: function (data) {
      localStorage.setItem(PEOPLE_DATA, JSON.stringify(data));
    },
    
    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(PEOPLE_DATA)) || [];
    },
      
    get: function () {
      //For test
      if(storage._getFromLocalStorage() == "") {
        storage._saveToLocalStorage(storage.people);
      }
      //--
      angular.copy(storage._getFromLocalStorage(), storage.people);
      return storage.people;
    },
    
    remove: function () {
      for (var i = storage.people.length - 1; i >= 0; i--) {
        if (storage.people[i].checked) {
          storage.people.splice(i, 1);
        }
      }
      storage._saveToLocalStorage(storage.people);
    },
    
    add: function (newPerson) {
      newPerson['checked'] = false;
      newPerson['updatable'] = false;
      storage.people.push(newPerson);
      storage._saveToLocalStorage(storage.people);
    },
    
    update: function () {
      storage._saveToLocalStorage(storage.people);
    }
  };
  
  return storage;
});