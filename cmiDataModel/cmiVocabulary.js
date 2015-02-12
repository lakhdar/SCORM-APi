(function (win) {
  "use strict";
  win.cmiVocabulary = function (options) {
    options = options || {};
    this.enumValues = options.values || [];
    this.value = options.value || '';
    this.canRead = true;
    this.canWrite = true;
    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }

  };

  win.cmiVocabulary.prototype =
    {
      checkValue: function (elm, val) {
        if (!~this.enumValues.indexOf(val))
          throw new scorm04Exception({
            code: "406",
            diagnosticCode: "d11",
          });
      },
      SetValue: function (elm, val) {
        if (!this.canWrite) {
          throw new scorm04Exception({
            code: "404",
            diagnosticCode: "d043",
          });
        }
        this.checkValue(elm, val);
        this.value = val;
      },
      GetValue: function () {
        if (!this.canRead) {
          throw new scorm04Exception({
            code: "403",
            diagnosticCode: "d20",
          });
        }
        return this.value;
      }
    }
  

})(this);


