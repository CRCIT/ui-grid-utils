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
