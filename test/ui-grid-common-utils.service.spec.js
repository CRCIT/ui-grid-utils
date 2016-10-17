'use strict';

describe('uiGridCommonUtilsService', function () {
  var uiGridCommonUtilsService;

  beforeEach(module('ui.grid.utils'));
  beforeEach(inject(function (_uiGridCommonUtilsService_) {
    uiGridCommonUtilsService = _uiGridCommonUtilsService_;

  }));


  describe('Comprobamos la utilidad de eliminar las etiquetas HTML', function () {

    it('si la entrada no tiene etiquetas devuelve la misma entrada', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('Entrada');
      expect(res).toEqual('Entrada');
    });

    it('si la entrada tiene una etiqueta devuelve el contenido dentro de la misma', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('<span>Entrada</span>');
      expect(res).toEqual('Entrada');
    });

    it('si la entrada tiene una etiqueta sin contenido una string vacia', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('<span></span>');
      expect(res).toEqual('');
    });

    it('si la entrada tiene una etiqueta sin cierre devuelve una string vacia', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('<br/>');
      expect(res).toEqual('');
    });

    it('si la entrada tiene etiquetas anidadas con contenido en la ultima devuelve el contenido de la ultima', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('<div><span>Entrada</span></div>');
      expect(res).toEqual('Entrada');
    });

    it('si la entrada tiene etiquetas anidadas con contenido en todas devuelve el contenido concatenado por orden', function () {
      var res = uiGridCommonUtilsService.removeHtmlTags('<div>Hello <b>world</b><small>!</small></div>');
      expect(res).toEqual('Hello world!');
    });

  });


});
