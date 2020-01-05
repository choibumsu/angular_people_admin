angular.module('todo').directive('mainTitle', function () {
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