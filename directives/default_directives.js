angular.module('people').directive('mainTitle', function () {
    return {
      template: `
        <div class="row">
            <div class="main-title">
                <h2>직원 조회 시스템</h2>
            </div>
        </div>
      `
    }
});

angular.module('people').directive('buttonGroup', function () {
  return {
    template: `
      <div class="row button-row">
        <button ng-click="excelDownload()" class="btn btn-success download-btn">엑셀 다운로드</button>
        <button ng-click="showAddSection()" class="btn btn-success add-btn">직원 추가</button>
        <button ng-click="remove()" class="btn btn-danger delete-btn">선택 항목 삭제</button>
      </div>
    `
  }
});