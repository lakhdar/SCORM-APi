/// <reference path="Lib/jasmine.js" />
/// <reference path="../cmi04DataModel.js" />
/// <reference path="../logger.js" />
/// <reference path="../scorm04Exception.js" />
/// <reference path="../scormApi.js" />
/// <reference path="../dataService.js" />

describe(" scorm apiGetValue tests ", function () {

  it("Call_GetValue_Version_Before_Init_Should_Retun_Empty", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    var get = api.GetValue('cmi._version');
    expect(get).toBe("");
    expect(api.lastError.errorCode).toBe("122");
  });

  it("Call_GetValue_Version_After_Finish_Should_Retun_Empty", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var term = api.Terminate("");
    expect(term).toBe("true");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var get = api.GetValue('cmi._version');
    expect(get).toBe("");
    expect(api.lastError.errorCode).toBe("123");

  });


  it("Call_GetValue_Version_Should_Retun_Version", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");
    var version = api.version;
    var get = api.GetValue('cmi._version');
    expect(get).toBe(version);
    expect(api.lastError.errorCode).toBe("0");

  });


  it("Call_GetValue_Count_nonArrayChild_Should_throw", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

   
    var val = api.GetValue('cmi.completion_threshold._count');
    expect(val).toBe('');
    expect(api.lastError.errorCode).toBe("203");

    var val = api.GetValue('cmi.credit._count');
    expect(val).toBe('');
    expect(api.lastError.errorCode).toBe("203");

  });

  it("Call_GetValue__children_nonArrayChild_Should_throw", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");


    var val = api.GetValue('cmi.completion_threshold._children');
    expect(val).toBe('');
    expect(api.lastError.errorCode).toBe("202");

    var val = api.GetValue('cmi.credit._children');
    expect(val).toBe('');
    expect(api.lastError.errorCode).toBe("202");

  });


})