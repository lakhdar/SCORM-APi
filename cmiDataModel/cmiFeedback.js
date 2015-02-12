(function (win) {
  "use strict";
  win.cmiFeedback = function (options) {
    options = options || {};
    this.feedBacks = {
      "0": "feedbackUnknown",
      "1": "feedbackTrueFalse",
      "2": "feedbackChoice",
      "3": "feedbackFillIn",
      "4": "feedbackNumeric",
      "5": "feedbackLickerT",
      "6": "feedbackMatching",
      "7": "feedbackPerformance",
      "8": "feedbackSequencing",
    }
    this.value = options.value / 1 || this.min || 0;
    this.feeback = this.feedBacks[options.feedback || '0'];
    this.canRead = true;
    this.canWrite = true;
    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }
  };

  win.cmiFeedback.prototype =
    {
      checkValue: function (elm, val) {
      },

      SetValue: function (elm, val) {
        if (!this.canWrite) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }
        this.checkValue(elm, val);
        this.value = val;
      },
      GetValue: function () {
        if (!this.canRead) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }
        return this.value;
      }
    }

})(this);


