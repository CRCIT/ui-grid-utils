/*!
 * ui-grid-utils
 * https://github.com/CRCIT/ui-grid-utils
 * @license Apache-2.0
 * v0.1.1
 * 2016-10-18T05:55:11.547Z
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
