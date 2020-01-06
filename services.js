angular.module('people').factory('peopleStorage', function () {
  axios.defaults.baseURL = 'http://localhost:8000/api';

  var storage = {
    people: [],
    
    get: function () {
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
      for (var i = storage.people.length - 1; i >= 0; i--) {
        if (storage.people[i].checked) {
          employee_id = storage.people[i].id;
          storage.people.splice(i, 1);
        }
      }

      axios.delete('/employees/' + String(employee_id) + '/')
      .then((res) => {
        alert("제거 완료");
      })
      .catch(function (err) {
        console.log("DELETE FAIL", err);
      });
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
    }
  };
  
  return storage;
});