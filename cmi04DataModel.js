
function copyProperties(source, dest) {

  for (var prop in source) {
    if (typeof source[prop] != "function") {
      dest[prop] = source[prop];

    }
  }
};

function copyPrototype(source, dest) {

  for (var prop in source) {
    if (typeof dest[prop] === "undefined") {
      dest[prop] = source[prop];
    }
  }
};


function cmiBaseType(options) {

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

cmiBaseType.prototype =
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



function cmiVocabulary(options) {
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

cmiVocabulary.prototype =
  {
    checkValue: function (elm, val) {
      if (!~this.enumValues.indexOf(val))
        throw new scorm04Exception({
          code: "201",
          diagnosticCode: "d20",
        });
    },
    SetValue: function (elm,val) {
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



function cmiDecimal(options) {
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

cmiDecimal.prototype =
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


function cmiInteger(options) {
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

cmiInteger.prototype =
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
function cmiLocaleString(options) {
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

cmiLocaleString.prototype =
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





function cmiString(options) {
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

cmiString.prototype =
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



function cmiTimestamp(options) {
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

cmiTimestamp.prototype =
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



function cmiLongIdentifier(options) {
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

cmiLongIdentifier.prototype =
  {
    checkValue: function (val) {
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



function cmiFeedback(options) {
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

cmiFeedback.prototype =
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



function cmiLanguage(options) {
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

cmiLanguage.prototype =
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

function cmiArray(options) {
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

cmiArray.prototype =
  {
    checkValue: function (elm,val) {
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

    SetValue: function (elm,val) {
      if (!this.canWrite) {
        throw new scorm04Exception({
          code: "201",
          diagnosticCode: "d20",
        });
      }
      var obj = this.checkValue(elm,val);
      if (!this.value[obj.index]) {
        var newObj = {};
        for (var p in this.type) {
          newObj[p] = this.type[p];
        }
        this.value[obj.index] = newObj;
      }

      var objType = this.value[obj.index];
      var cmiObj = objType[obj.arrValue[0]];
      cmiObj.SetValue(obj.arrValue.slice(1),val);
    },
    GetValue: function (val) {
      if (!this.canRead) {
        throw new scorm04Exception({
          code: "201",
          diagnosticCode: "d20",
        });
      }
      var obj = this.checkValue(val);
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



function cmiGroup(options) {
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

cmiGroup.prototype =
  {
    checkValue: function (elem,val) {
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

    SetValue: function (elem,val) {
      if (!this.canWrite) {
        throw new scorm04Exception({
          code: "201",
          diagnosticCode: "d20",
        });
      }
      var arrValue = this.checkValue(elem,val);
      var obj = this[arrValue[0]];
      obj.SetValue(arrValue.slice(1), val);
    },
    GetValue: function (elm) {
      if (!this.canRead) {
        throw new scorm04Exception({
          code: "201",
          diagnosticCode: "d20",
        });
      }
      var arrValue = this.checkValue(elm);
      var obj = this[arrValue[0]];
      return obj.GetValue(arrValue.slice(1));
    }
  }

var cmi04Option = {

  comments_from_learner: new cmiArray({
    type: {
      comment: new cmiLocaleString({ min: 0, max: 4096 }),
      location: new cmiString({ min: 0, max: 4096 }),
      timestamp: new cmiTimestamp(),
    }
  }),

  comments_from_lms: new cmiArray({
    type: {
      comment: new cmiLocaleString({ min: 0, max: 4096 }),
      location: new cmiString({ min: 0, max: 4096 }),
      timestamp: new cmiTimestamp(),
    }
  }),
  completion_status: new cmiVocabulary({ values: ["completed", "incomplete", "not attempted", "unknown"] }),
  completion_threshold: new cmiDecimal({ min: 0, max: 1, canWrite: false }),
  credit: new cmiVocabulary({ values: ["credit", "no-credit"], canRead: false }),
  entry: new cmiVocabulary({ values: ["ab-initio", "resume"], canRead: false }),
  exit: new cmiVocabulary({ values: ["time-out", "logout", "suspend", "normal"], canRead: false }),
}