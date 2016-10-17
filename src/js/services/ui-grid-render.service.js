(function () {
  'use strict';

  angular.module('ui.grid.utils')
    .service('uiGridRenderService', ['uiGridCommonUtilsService', '$compile', '$rootScope', '$parse', '$interpolate',
      function (uiGridCommonUtilsService, $compile, $scope, $parse, $interpolate) {

        function getRenderedCellValue(row, col) {
          $scope.grid = row.grid;
          $scope.row = row;
          $scope.col = col;

          var html = uiGridCommonUtilsService.replaceFieldWithExpression(col, col.cellTemplate);
          var cellTemplate = $compile(html)($scope);
          var cellValue = $interpolate(cellTemplate.html())($scope);
          return cellValue;
        }

        function getRenderStringValue(row, col, string) {
          $scope.grid = row.grid;
          $scope.row = row;
          $scope.col = col;

          var expressionString = uiGridCommonUtilsService.replaceFieldWithExpression(col, string);
          var renderedValue = $interpolate(expressionString)($scope);
          return renderedValue;
        }

        //service body

        return {
          getRenderedCellValue: getRenderedCellValue,
          getRenderStringValue: getRenderStringValue
        };

      }]);

})();
