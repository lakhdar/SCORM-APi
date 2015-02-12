/// <reference path="Lib/jasmine.js" />
/// <reference path="../cmi04DataModel.js" />
/// <reference path="../logger.js" />
/// <reference path="../scorm04Exception.js" />
/// <reference path="../scormApi.js" />
/// <reference path="../dataService.js" />


describe(" scorm api tests ", function () {

  it("Call_initalize_With_Params_should_Retun_false_LastError_should_Be_201", function () {

    var api = new scormApi();
    var int = api.Initialize("Params");
    expect(int).toBe("false");
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("201");
    expect(api.lastError.diagnosticCode).toBe("d24");

  });

  it("Call_initalize_With_Null_should_Retun_false", function () {

    var api = new scormApi();
    var int = api.Initialize("Params");
    expect(int).toBe("false");
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("201");
    expect(api.lastError.diagnosticCode).toBe("d24");

  });

  it("Call_initalize_With_emty_String_should_Retun_true", function () {
    var api = new scormApi();
    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);
  });

  it("Call_initalize_After Initialize _With_emty_String_should_Retun_false", function () {
    var api = new scormApi();
    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);

    int = api.Initialize("");
    expect(int).toBe("false");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("103");
    expect(api.lastError.diagnosticCode).toBe("d010");
  });

  it("Call_GetLastError_should_Retun_Corresponding_Key", function () {
    var api = new scormApi();
    expect(api.GetLastError(0)).toBe("0");
  });

  it("Call_GetErrorString_should_Retun_Corresponding_Text", function () {
    var api = new scormApi();
    var msg = scorm04Exception.prototype.stdTexts[0];
    expect(api.GetErrorString(0)).toBe(msg);
    msg = scorm04Exception.prototype.stdTexts[101];
    expect(api.GetErrorString(101)).toBe(msg);
    msg = scorm04Exception.prototype.stdTexts['101'];
    expect(api.GetErrorString('101')).toBe(msg);
  });

  it("Call_Commit_With_InValid_Arguments_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var int = api.Initialize("");
    expect(int).toBe("true");

    var com = api.Commit("ccc");
    expect(com).toBe("false");

    expect(api.lastError.errorCode).toBe("201");
    expect(api.lastError.diagnosticCode).toBe("d24");

  });

  it("Call_Commit_With_Null_Arguments_Should_Retun_false", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    var int = api.Initialize("");
    expect(int).toBe("true");
    var com = api.Commit(null);
    expect(com).toBe("false");
    expect(api.lastError.errorCode).toBe("201");
    expect(api.lastError.diagnosticCode).toBe("d24");

  });

  it("Call_Commit_With_Valid_Arguments_Before_Init_should_Retun_false", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    var com = api.Commit("");
    expect(com).toBe("false");
    expect(api.lastError.errorCode).toBe("142");
    expect(api.lastError.diagnosticCode).toBe("d050");

  });

  it("Call_Commit_With_Valid_Arguments_After_Init_should_Retun_true", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var int = api.Initialize("");
    expect(int).toBe("true");

    var com = api.Commit("");
    expect(com).toBe("true");

    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);

  });

  it("Call_Commit_With_Valid_Arguments_After_Terminate_should_Retun_false", function () {

    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    var int = api.Initialize("");
    expect(int).toBe("true");
   
    var term = api.Terminate("");

    expect(term).toBe("true");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    var com = api.Commit("");
    expect(com).toBe("false");

    expect(api.lastError.errorCode).toBe("143");
    expect(api.lastError.diagnosticCode).toBe("d051");
  });

  it("Call_Terminate_After_Init_With_Emty_String_should_Retun_true", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.isFinished).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var term = api.Terminate("");

    expect(term).toBe("true");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

  });

  it("Call_Terminate_After_Init_With_null_should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.isFinished).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var term = api.Terminate(null);

    expect(term).toBe("false");
    expect(api.isInitialized).toBe(true);
    expect(api.isFinished).toBe(false);
    expect(api.lastError.errorCode).toBe("201");

  });

  it("Call_Terminate_After_Terminate_With_Emty_String_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.isFinished).toBe(false);
    expect(api.lastError.errorCode).toBe("0");

    var term = api.Terminate("");
    
    expect(term).toBe("true");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(true);
    expect(api.lastError.errorCode).toBe("0");

    term = api.Terminate("");

    expect(term).toBe("false");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(true);
    expect(api.lastError.errorCode).toBe("112");

  });

  it("Call_Terminate_Before_Init_With_Emty_String_Should_Retun_false", function () {
    var api = new scormApi();
    expect(api.isInitialized).toBe(false);
    expect(api.lastError.errorCode).toBe("0");
    var term = api.Terminate("");

    expect(term).toBe("false");
    expect(api.isInitialized).toBe(false);
    expect(api.isFinished).toBe(false);
    expect(api.lastError.errorCode).toBe("112");

  });


})