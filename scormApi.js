///<reference path="logger.js" />
///<reference path="scorm04Exception.js" />
///<reference path="cmi04DataModel.js" />
/// <reference path="dataService.js" />

(function (win) {

  win.scormApi = function (initialmodel) {
    this.isInitialized = false;
    this.isFinished = false;
    this.dataService = new dataService();
    this.logger = new logger();
    this.cmi =initialmodel.cmi|| {};
    this.lastError = new scorm04Exception();
    this.version = "1.0"
  }

  win.scormApi.prototype =
  {

    Initialize: function (zlString) {
      this.logger.log('Initialize("' + zlString + '") called.');

      try {
        if (zlString == null || zlString.length > 0) {
          //LMSInitialize, LMSCommit, and LMSFinish require an empty string as a parameter.
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d24",
          })
        }
        if (this.isInitialized) {
          //Initialize may only be called once per SCO session.
          throw new scorm04Exception({
            code: "103",
            diagnosticCode: "d010",
          })
        }

        if (this.isFinished) {
          //Cannot call Initialize after Finish.
          throw new scorm04Exception({
            code: "104",
            diagnosticCode: "d011",
          })
        }

        //TODO Init
        this.dataService.getData(this.cmi);
        this.isInitialized = true;
        this.lastError = new scorm04Exception();
        return "true";
      }
      catch (err) {
        console.error(err)
        this.logger.log('Initialize("' + zlString + '") error:');
        this._parseException(err, "102", "d012");
      }

      return "false";

    },

    Commit: function (zlString) {
      this.logger.log('Commit("' + zlString + '") called.');
      try {
        if (zlString == null || zlString.length > 0) {
          //LMSInitialize, LMSCommit, and LMSFinish require an empty string as a parameter.
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d24",
          });
        }

        if (this.isFinished) {
          //Cannot call Initialize after Finish.
          throw new scorm04Exception({
            code: "143",
            diagnosticCode: "d051",
          })
        }

        if (!this.isInitialized) {
          //Initialize may only be called once per SCO session.
          throw new scorm04Exception({
            code: "142",
            diagnosticCode: "d050",
          })
        }

        //TODO Commit
        this.dataService.save(this.cmi);
        this.lastError = new scorm04Exception();
        return "true";
      }
      catch (err) {
        this.logger.log('Commit("' + zlString + '") error:');
        this._parseException(err, "391", "d052");
      }

      return "false";
    },

    Terminate: function (zlString) {
      this.logger.log('Terminate("' + zlString + '") called.');
      try {
        if (zlString == null || zlString.length > 0) {
          //LMSInitialize, LMSCommit, and LMSFinish require an empty string as a parameter.
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d24",
          })
        }

        if (!this.isInitialized) {
          throw new scorm04Exception({
            code: "112",
            diagnosticCode: "d020",
          })
        }

        if (this.isFinished) {
          throw new scorm04Exception({
            code: "113",
            diagnosticCode: "d021",
          })
        }

        //TODO Commit
        this.Commit("");
        if (this.lastError.errorCode / 1 != 0) {
          throw this.lastError;
        }

        this._exitAU();
        this.cmi = {};
        this.isInitialized = false;
        this.isFinished = true;
        this.lastError = new scorm04Exception();
        return "true";
      }
      catch (err) {
        this.logger.log('Terminate("' + zlString + '") error:');
        this._parseException(err, "111", "d022");
      }

      return "false";
    },

    SetValue: function (elementName, elementValue) {
      this.logger.log('SetValue("' + elementName + '","' + elementValue + '") called.');
      var success = false;
      try {
                                                 
        if (elementValue == null) {
          /*invalid element name format*/
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          })
        }

        if (this.isFinished) {
          throw new scorm04Exception({ 
            code: "133",
            diagnosticCode: "d041",
          })
        }

        if (!this.isInitialized) {
          throw new scorm04Exception({
            code: "132",
            diagnosticCode: "d040",
          })
        }
        elementName = elementName + "";
        elementValue = elementValue + "";

        var cmiNames = elementName.split('.');
        if (cmiNames == null) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d18",
          })
        }
        var lastcmiName = cmiNames[cmiNames.length - 1];
        if (/_children|_count|_version/gi.test(lastcmiName)) {
          throw new scorm04Exception({
            code: "402",
            diagnosticCode: "d19",
          })
        }
        var datamodel = this[cmiNames[0]];
   
        if (!datamodel || !datamodel.SetValue) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d26",
          })
        }
      
        datamodel.SetValue(cmiNames.slice(1), elementValue);

        this.lastError = new scorm04Exception();
        success = true;
      }
      catch (err) {
        this.logger.log('SetValue("' + elementName + ',"' + elementValue + '") Error:');
        this._parseException(err, "351", "d032")
      }

      return (!!success) + "";
    },

    GetValue: function (elementName) {
      this.logger.log('GetValue("' + elementName + '") called.');

      try {
        var value = "";

        if (this.isFinished) {
          throw new scorm04Exception({
            code: "123",
            diagnosticCode: "d031",
          })
        }

        if (!this.isInitialized) {
          throw new scorm04Exception({
            code: "122",
            diagnosticCode: "d030",
          })
        }

        var cmiNames = elementName.toString().split('.');
        if (cmiNames == null) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d18",
          })
        }

        var lastcmiNames = cmiNames[cmiNames.length - 1];
        if (/_version/gi.test(lastcmiNames)) {
          value = this.version;
          throw new scorm04Exception({
            code: "0",
            diagnosticCode: "",
          });
        }

        var datamodel = this[cmiNames[0]];
        if (!datamodel || ! datamodel.GetValue) {
          throw new scorm04Exception({
            code: "401",
            diagnosticCode: "d06",
          })
        }
        var childNames = cmiNames.slice(1);

        if (/^_count$/gi.test(lastcmiNames)) {
          var child = datamodel[childNames[0]];
          if (!(child instanceof cmiArray)) {
            throw new scorm04Exception({
              code: "203",
              diagnosticCode: "d16",
            });
          }
        }

        if (/^_children$/gi.test(lastcmiNames)) {
          var child = datamodel[childNames[0]];
          if (!(child instanceof cmiArray || child instanceof cmiGroup)) {
            throw new scorm04Exception({
              code: "202",
              diagnosticCode: "d30",
            });
          }
        }

        value = datamodel.GetValue(childNames);
        this.lastError = new scorm04Exception();
      }
      catch (err) {
        this.logger.log('SetValue("' + elementName + '") Error:');
        this._parseException(err, "301", "d032")
      }

      return value;
    },

    GetLastError: function () {
      this.logger.log('GetLastError() called.');
      return this.lastError.errorCode;
    },
    GetErrorString: function (errorCode) {
      var error = (errorCode / 1);
      this.logger.log('GetErrorString("' + (error || "") + '") called.');
      return this.lastError.getStandardText(error)
    },
    GetDiagnostic: function (errorCode) {
      this.logger.log('GetDiagnostic("' + errorCode + '") called.');
      return this.lastError.getDiagnostics(errorCode);
    },
    _exitAU: function () { },
    _parseException: function (exp, code, diagnostic) {
      this.logger.error(exp);
      this.lastError = new scorm04Exception({
        code: code,
        diagnosticCode: diagnostic,
        extraText: exp ? exp.toString() : "",
      });
      if (exp instanceof scorm04Exception) {
        this.lastError = new scorm04Exception({
          code: exp.errorCode,
          diagnosticCode: exp.diagnosticCode,
          extraText: exp.extraText,
        })
      }
    },
    _setInitialData: function () {

      var set = this.SetValue("cmi.learner_id", "1");
      set = this.SetValue("cmi.learner_name", "learner");
      set = this.SetValue("cmi.entry", "ab-initio");
      set = this.SetValue("cmi.completion_status", "unknown");
      set = this.SetValue("cmi.success_status", "unknown");
      set = this.SetValue("cmi.location", "");
      set = this.SetValue("cmi.mode", "normal");
      set = this.SetValue("cmi.credit", "no-credit");
      set = this.SetValue("cmi.score.raw", "");
      set = this.SetValue("cmi.score.max", "");
      set = this.SetValue("cmi.score.min", "");
      set = this.SetValue("cmi.scaled_passing_score", "");
      set = this.SetValue("cmi.time_limit_action", "continue,no message");
      set = this.SetValue("cmi.comments_from_lms.0.comment", "[comments]");
      set = this.SetValue("cmi.suspend_data", "");
      set = this.SetValue("cmi.launch_data", "");
      return set;
    },

  }

})(this);
