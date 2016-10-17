/*!
 * ui-grid-utils
 * https://github.com/CRCIT/ui-grid-utils
 * @license Apache-2.0
 * v0.1.0
 * 2016-10-17T14:41:28.997Z
 */
(function () {
  'use strict';

  /**
   * @ngdoc module
   * @name ui.grid.utils
   * @description Main plugin module
   */
  angular.module('ui.grid.utils', ['ui.grid']);

})();

(function () {
  'use strict';

  angular.module('ui.grid.utils')
    .service('uiGridCommonUtilsService', ['Grid', 'uiGridConstants', 'gridUtil',
      function (Grid, uiGridConstants, gridUtil) {

        function replaceFieldWithExpression(col, inputStringWithFields) {
          var replacedInputWithExpressions = inputStringWithFields
            .replace(uiGridConstants.MODEL_COL_FIELD, 'row.entity.' + gridUtil.preEval(col.field))
            .replace(uiGridConstants.COL_FIELD, 'grid.getCellValue(row, col)');
          return replacedInputWithExpressions;
        }

        function removeHtmlTags(text) {
          return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }

        //service body
        return {
          replaceFieldWithExpression: replaceFieldWithExpression,
          removeHtmlTags: removeHtmlTags
        };

      }]);
})();

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
