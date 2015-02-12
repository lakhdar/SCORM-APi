/// <reference path="Lib/jasmine.js" />
/// <reference path="../logger.js" />
/// <reference path="../scorm04Exception.js" />
/// <reference path="../dataService.js" />

/// <reference path="../cmiDataModel/cmiBaseType.js" />
/// <reference path="../cmiDataModel/cmiDecimal.js" />
/// <reference path="../cmiDataModel/cmiFeedback.js" />
/// <reference path="../cmiDataModel/cmiInteger.js" />
/// <reference path="../cmiDataModel/cmiLanguage.js" />
/// <reference path="../cmiDataModel/cmiLocaleString.js" />
/// <reference path="../cmiDataModel/cmiLongIdentifier.js" />
/// <reference path="../cmiDataModel/cmiString.js" />
/// <reference path="../cmiDataModel/cmiTimestamp.js" />
/// <reference path="../cmiDataModel/cmiVocabulary.js" />
/// <reference path="../cmiDataModel/cmiArray.js" />
/// <reference path="../cmiDataModel/cmiGroup.js" />
/// <reference path="../cmiDataModel/cmi04.js" />

/// <reference path="../scormApi.js" />

describe("SCORM 4 API Tests", function () {
  it("Run_Api_Session_ShouldNot_throw", function () {

    var api = new scormApi({
      cmi: new cmiGroup(cmi04)
    });
    var int = api.Initialize("");
    expect(int).toBe("true");
    expect(api.isInitialized).toBe(true);
    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);

    var set = api._setInitialData()
    expect(set).toBe("true");
    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);

    var completionStatus = api.GetValue("cmi.completion_status");

    expect(completionStatus).toBe("unknown");

    set = api.SetValue("cmi.completion_status", "incomplete");
    expect(set).toBe("true");
    completionStatus = api.GetValue("cmi.completion_status");
    expect(completionStatus).toBe("incomplete");

    var bookmark = api.GetValue("cmi.location");
    expect(bookmark).toBe("");

    set = api.SetValue("cmi.score.raw", 80);
    expect(set).toBe("true");
    set = api.SetValue("cmi.score.min", "0");
    expect(set).toBe("true");
    set = api.SetValue("cmi.score.max", "100");
    expect(set).toBe("true");
    set = api.SetValue("cmi.score.scaled", (80 / 100));
    expect(set).toBe("true");
    set = api.SetValue("cmi.success_status", "passed");
    expect(set).toBe("true");

    set = api.SetValue("cmi.exit", "suspend");
    expect(set).toBe("true");
    api.Commit("");
    api.Terminate("");
    expect(api.lastError.errorCode).toBe("0");
    expect(api.lastError.diagnosticCode).toBe(null);
  });

})