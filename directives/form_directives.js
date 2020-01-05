angular.module('todo').directive('searchForm', function () {
    return {
      template: `
        <div class="row">
            <form name="todoForm" ng-submit="searchFilter={name:newTodoTitle}" class="search-form">
                <div class="input-group">
                <input type="text" class="form-control" ng-model="newTodoTitle" placeholder="이름으로 검색해주세요.">
                <div class="input-group-append">
                    <button class="btn btn-success" type="submit">검색</button>
                </div>
                </div>
            </form> 
        </div>
      `
    }
});

angular.module('todo').directive('personForm', function () {
  return {
    template: `
      <form ng-show="showAdd == true" name="personForm" ng-submit="add(newPerson)" class="person-form">
        <div class="row add-row table-header">
          <div class="col-3 table-header-col">
              이름
          </div>
          <div class="col-2 table-header-col">
              성별
          </div>
          <div class="col-2 table-header-col">
              나이
          </div>
          <div class="col-5 table-header-col">
              거주지
          </div>
        </div>

        <div class="row add-row table-content">
          <input type="text" ng-model="newPerson.name" class="col-3 table-content-col">
          <input type="text" ng-model="newPerson.gender" class="col-2 table-content-col">
          <input type="text" ng-model="newPerson.age" class="col-2 table-content-col">
          <input type="text" ng-model="newPerson.address" class="col-5 table-content-col">
        </div>
        <div class="row button-row">
          <button type="submit" class="btn btn-success person-submit-btn">제출</button>
          <button type="button" ng-click="hideAddSection()" class="btn btn-danger person-cancel-btn">취소</button>
        </div>
      </form>
    `
  }
});