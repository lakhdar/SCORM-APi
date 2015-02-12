(function (win) {
  "use strict";
  win.cmiTimestamp = function (options) {
    options = options || {};
    this.value = options.value / 1 || this.min || 0;
    this.canRead = true;
    this.canWrite = true;
    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }
  };

  win.cmiTimestamp.prototype =
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


