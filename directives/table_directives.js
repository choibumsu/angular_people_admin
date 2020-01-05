angular.module('todo').directive('tableHeader', function () {
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

angular.module('todo').directive('tableContent', function () {
    return {
      template: `
        <div ng-repeat="person in people | filter:searchFilter" class="row table-content">
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
                <button class="btn btn-success person-update-btn">수정</button>
            </div>
        </div>
      `
    }
});



  