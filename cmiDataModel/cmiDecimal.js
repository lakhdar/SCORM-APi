(function (win) {

  "use strict";
  win.cmiDecimal = function (options) {
    options = options || {};
    this.min = options.min / 1 || 0;
    this.max = options.max / 1 || Number.MAX_VALUE;
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

  win.cmiDecimal.prototype =
    {
      checkValue: function (elm, val) {
        if (val > this.max || val < this.min)
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
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


