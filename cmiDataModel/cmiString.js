(function (win) {
  "use strict";

  win.cmiString = function (options) {
    options = options || {};
    this.min = options.min / 1 || 0;
    this.max = options.max / 1 || Number.MAX_VALUE;
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

  win.cmiString.prototype =
    {
      checkValue: function (elm, val) {
        if (val.length > this.max || val.length < this.min)
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
      },
    }

})(this);


