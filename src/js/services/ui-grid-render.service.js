(function () {
  'use strict';

  angular.module('ui.grid.utils')
    .service('uiGridRenderService', ['uiGridCommonUtilsService', '$compile', '$parse', '$interpolate',
      function (uiGridCommonUtilsService, $compile, $parse, $interpolate) {

        function getRenderedCellValue(row, col) {
          var scope = _getScope(row,col);

          var html = uiGridCommonUtilsService.replaceFieldWithExpression(col, col.cellTemplate);
          var cellTemplate = $compile(html)(scope);
          var cellValue = $interpolate(cellTemplate.html())(scope);
          return cellValue;
        }

        function getRenderStringValue(row, col, string) {
          var scope = _getScope(row,col);

          var expressionString = uiGridCommonUtilsService.replaceFieldWithExpression(col, string);
          var renderedValue = $interpolate(expressionString)(scope);
          return renderedValue;
        }

        function _getScope(row, col) {
          var scope = row.grid.appScope;
          scope.grid = row.grid;
          scope.row = row;
          scope.col = col;
          return scope;
        }

        //service body

        return {
          getRenderedCellValue: getRenderedCellValue,
          getRenderStringValue: getRenderStringValue
        };

      }]);

})();
