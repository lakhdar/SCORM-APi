(function (win) {
  "use strict";
  win.cmiBaseType = function (options) {

    options = options || {};
    this.value = options.value || '';
    this.canRead = true;
    this.canWrite = true;
    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }
  }

  win.cmiBaseType.prototype =
    {

      checkValue: function (val) {
      },
      SetValue: function (val) {
        this.checkValue(val);
        this.value = val;
      },
      GetValue: function () {
        return this.value;
      },

    }

})(this);


