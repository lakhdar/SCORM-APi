(function (win) {
  "use strict";

  win.cmiGroup = function (options) {
    options = options || {};
    for (var p in options) {
      this[p] = options[p];
    }
    this.canRead = true;
    this.canWrite = true;

    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }
  };

  win.cmiGroup.prototype =
    {
      checkValue: function (elem, val) {
        var arrValue = typeof elem === "string" ? elem.split(/\./g) : elem;
        var obj = this[arrValue[0]];
        if (!obj || typeof (obj.SetValue) != "function" || typeof (obj.GetValue) != "function") {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }
        return arrValue;
      },

      SetValue: function (elem, val) {
        if (!this.canWrite) {
          throw new scorm04Exception({
            code: "404",
            diagnosticCode: "d043",
          });
        }
        var arrValue = this.checkValue(elem, val);
        var obj = this[arrValue[0]];
        obj.SetValue(arrValue.slice(1), val);
      },
      GetValue: function (elm) {
        if (!this.canRead) {
          throw new scorm04Exception({
            code: "403",
            diagnosticCode: "d20",
          });
        }
        var arrValue = this.checkValue(elm);
        var obj = this[arrValue[0]];
        return obj.GetValue(arrValue.slice(1));
      }
    }

})(this);


