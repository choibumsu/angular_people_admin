angular.module('people').directive('searchForm', function () {
    return {
      template: `
        <div class="row">
            <form name="searchForm" ng-submit="searchFilter={name:queryName}; updatePageNums(1); movePage(1);" class="search-form">
                <div class="input-group">
                <input type="text" class="form-control" ng-model="queryName" placeholder="이름으로 검색해주세요.">
                <div class="input-group-append">
                    <button class="btn btn-success" type="submit">검색</button>
                </div>
                </div>
            </form> 
        </div>
      `
    }
});

angular.module('people').directive('personForm', function () {
  return {
    template: `
      <form ng-show="showAdd == true" name="personAddForm" ng-submit="add(newPerson)" class="person-add-form">
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
          <input type="number" ng-model="newPerson.age" min="0" max="100" class="col-2 table-content-col">
          <input type="text" ng-model="newPerson.address" class="col-5 table-content-col">
        </div>
        <div ng-show="addable == false">
          <div class="alert alert-warning" role="alert">{{ addErrorMsg }}</div>
        </div>
        <div class="row button-row">
          <button type="submit" class="btn btn-success person-submit-btn">제출</button>
          <button type="button" ng-click="hideAddSection()" class="btn btn-danger person-cancel-btn">닫기</button>
        </div>
      </form>
    `
  }
});