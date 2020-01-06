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
    },

    getPureData: function () {
      neededKeys = ['name', 'gender', 'age', 'address'];
      origin_people = storage.get();
      purePeople= [];

      for(i in origin_people) {
        purePeople.push({});
        for(key in origin_people[i]) {
          if(neededKeys.includes(key)) {
            purePeople[i][key] = origin_people[i][key];
          }
        }
      }

      return purePeople;
    },

    convertJsonToCsv : function(json_array) {
      csv_data = [];
      header = [];

      for(key in json_array[0]) {
        header.push(key);
      }
      csv_data.push(header);
      
      for(i in json_array) {
        data = [];
        for(key in json_array[i]) {
          data.push(json_array[i][key]);
        }
        csv_data.push(data);
      }

      return csv_data;
    },

    excelDownload: function () {
      var wb = XLSX.utils.book_new();
      var data = storage.getPureData();

      var newWorksheet = excelHandler.getWorksheet(storage.convertJsonToCsv(data));
      XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());
  
      var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
      saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
    }
  };

  var excelHandler = {
		getExcelFileName : function(){
		    return 'people_list.xlsx';
		},
		getSheetName : function(){
			return '직원 명단';
    },
		getWorksheet : function(data){
			return XLSX.utils.aoa_to_sheet(data);
    }
  }

  function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
  }
  
  return storage;
});