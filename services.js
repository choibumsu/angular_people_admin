angular.module('people').factory('peopleStorage', function () {
  axios.defaults.baseURL = 'http://localhost:8000/api';

  var storage = {

    people: [],
    
    get: function () {
      // storage.people = [
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //         {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      //   {
      //     name: "유인근",
      //     gender: "남",
      //     age: 25,
      //     address: "서울시 동작구",
      //     checked: false,
      //     updatable : false,
      //   },
      // ]

      // return storage.people;

      // const getEmployeesInfo = async () => {
      //   await axios.get('/employees/')
      //     .then((res) => {
      //       angular.copy(res.data, storage.people);
      //       console.log("통신부분")
      //       console.log("조회 완료", res);
      //     })
      //     .catch(function (err) {
      //       console.log("GET FAIL", err);
      //     });
      //   }
      //   getEmployeesInfo().then(
      //       () => {
      //         console.log(storage.people);
      //         return storage.people;
      //       }
      //   )

      axios.get('/employees/')
        .then((res) => {
          angular.copy(res.data, storage.people);
          console.log("조회 완료", res);
        })
        .catch(function (err) {
          console.log("GET FAIL", err);
        });
      return storage.people;

    },

    remove: function () {
      var employee_id;
      var updatable = true;
      for (var i = storage.people.length - 1; i >= 0; i--) {
        if (storage.people[i].checked) {
          employee_id = storage.people[i].id;
          storage.people.splice(i, 1);
        }
        else {
          if(storage.people[i].updatable) {
            updatable = false;
          }
        }
      }

      axios.delete('/employees/' + String(employee_id) + '/')
      .then((res) => {
        alert("제거 완료");
      })
      .catch(function (err) {
        console.log("DELETE FAIL", err);
      });
      return updatable;
    },
    
    add: function (newPerson) {
      newPerson['checked'] = false;
      newPerson['updatable'] = false;
      var postData = newPerson

      axios.post('employees/', postData)
        .then((res) => {
          storage.people.push(postData);
          alert("생성 완료", res);
          location.reload();
        })
        .catch(function (err) {
          console.log("CREATE FAIL", err);
        });
    },
    
    update: function (employee) {
      var params = {
        name: employee.name,
        gender: employee.gender,
        age: employee.age,
        address: employee.address
      };
      
      axios.put('/employees/' + String(employee.id) + '/', params)
        .then((res) => {
          var idx = storage.people.findIndex(function (item) {
            return item.id === employee.id;
          })

          storage.people[idx].name = employee.name;
          storage.people[idx].gender = employee.gender;
          storage.people[idx].age = employee.age;
          storage.people[idx].address = employee.address;
          alert("수정 완료");
        })
        .catch(function (err) {
          console.log("PUT FAIL", err);
        });
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