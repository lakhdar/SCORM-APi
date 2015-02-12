(function (win) {
  "use strict";
  win.cmiArray = function (options) {
    options = options || {};
    this.type = options.type || {};
    this.value = [];
    this.canRead = true;
    this.canWrite = true;
    if (typeof (options.canRead) != "undefined") {
      this.canRead = !!options.canRead
    }
    if (typeof (options.canWrite) != "undefined") {
      this.canWrite = !!options.canWrite
    }
  };

  win.cmiArray.prototype =
    {
      checkValue: function (elm, val) {
        var arrValue = typeof elm === "string" ? elm.split(/\./g) : elm;
        var index = arrValue[0] / 1;
        if (isNaN(index) || index < 0) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }

        return { index: index, arrValue: arrValue.slice(1) };
      },

      SetValue: function (elm, val) {
        if (!this.canWrite) {
          throw new scorm04Exception({
            code: "404",
            diagnosticCode: "d043",
          });
        }
        var obj = this.checkValue(elm, val);
        if (!this.value[obj.index]) {
          var newObj = {};
          for (var p in this.type) {
            newObj[p] = this.type[p];
          }
          this.value[obj.index] = newObj;
        }

        var objType = this.value[obj.index];
        var cmiObj = objType[obj.arrValue[0]];
        cmiObj.SetValue(obj.arrValue.slice(1), val);
      },

      GetValue: function (elem) {

        if (/^_count$/gi.test(elem)) {
          return this.value.length;
        }
        if (/^_children$/gi.test(elem)) {
          var ret = "";
          for (var p in this.type) ret += p;
          return ret;
        }

        if (!this.canRead) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }
        var obj = this.checkValue(elem);
        var objType = this.value[obj.index];
        if (!this.value[obj.index]) {
          throw new scorm04Exception({
            code: "201",
            diagnosticCode: "d20",
          });
        }
        var cmiObj = objType[obj.arrValue[0]];
        return cmiObj.GetValue(obj.arrValue.slice(1));
      }
    }
})(this);


