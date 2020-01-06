angular.module('people').directive('tableHeader', function () {
    return {
      template: `
        <div class="row table-header">
            <div class="col-1 table-header-col">
                선택
            </div>
            <div class="col-3 table-header-col">
                이름
            </div>
            <div class="col-1 table-header-col">
                성별
            </div>
            <div class="col-1 table-header-col">
                나이
            </div>
            <div class="col-5 table-header-col">
                거주지
            </div>
            <div class="col-1 table-header-col">
                수정
            </div>
        </div>
      `
    }
});

angular.module('people').directive('tableContent', function () {
    return {
      restrict: 'EA',
      //template: '<div ng-include="aa()"></div>',
      template: "",

      link: function(scope, element, attrs) {
       
        scope.$watch('people', function(newValue, oldValue) {
                console.log("sgkfnspdifjpdsahgpsdhgp");
                console.log(scope.people[0]);
                
                if (typeof scope.people !== "undefined" && scope.people != null ) {
                    
                     scope.aa = function () {
                        console.log("aa()");
                        return `
                        <div ng-repeat="person in people" class="table-content">
                            <div ng-hide="person.updatable" class="row">
                                <div class="col-1 table-content-col">
                                    <input type="checkbox" ng-model="person.checked">
                                </div>
                                <div class="col-3 table-content-col">
                                    {{ person.name }}
                                </div>
                                <div class="col-1 table-content-col">
                                    {{ person.gender }}
                                </div>
                                <div class="col-1 table-content-col">
                                    {{ person.age }}
                                </div>
                                <div class="col-5 table-content-col">
                                    {{ person.address }}
                                </div>
                
                                <div class="col-1 table-content-col">
                                    <button ng-click="prepareUpdate(person)" class="btn btn-success person-update-btn">수정</button>
                                </div>
                            </div>
                            <form name="personUpdateForm" ng-show="person.updatable" ng-submit="update(person)" class="row update-row">
                                <div class="col-1 table-content-col">
                                    <input type="checkbox" ng-model="person.checked">
                                </div>
                                <input ng-model="person.name" class="col-3 table-content-col" />
                                <input ng-model="person.gender" class="col-1 table-content-col" />
                                <input ng-model="person.age" class="col-1 table-content-col" />
                                <input ng-model="person.address" class="col-5 table-content-col" />
                                <div class="col-1 table-content-col">
                                    <button type="submit" class="btn btn-warning person-update-btn">제출</button>
                                </div>
                            </form>
                        </div>
                      `
                    };
                }
        });

      } // link ()

    } // return
   
});



  