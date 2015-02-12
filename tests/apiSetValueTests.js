/// <reference path="Lib/jasmine.js" />
/// <reference path="../cmi04DataModel.js" />
/// <reference path="../logger.js" />
/// <reference path="../scorm04Exception.js" />
/// <reference path="../scormApi.js" />
/// <reference path="../dataService.js" />

describe(" scorm apiSetValue tests ", function () {
  it("Call_SetValue_Version_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var set = api.SetValue('cmi._version', 10);
    expect(set).toBe("false");
    expect(api.lastError.errorCode).toBe("402");

  });

  it("Call_SetValue__count_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var set = api.SetValue('cmi._count', 10);
    expect(set).toBe("false");
    expect(api.lastError.errorCode).toBe("402");

  });

  it("Call_SetValue__children_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var set = api.SetValue('cmi._children', 10);
    expect(set).toBe("false");
    expect(api.lastError.errorCode).toBe("402");

  });

})