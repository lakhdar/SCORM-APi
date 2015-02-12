(function (win) {

  win.scorm04Exception = function (initializer) {
    this.errorCode = (initializer || { code: "0" }).code || "0";
    this.diagnosticCode = (initializer || { diagnosticCode: null }).diagnosticCode || null;
    this.extraText = (initializer || { extraText: null }).extraText || null;
  }

  win.scorm04Exception.prototype =
  {
    getErrorText: function () {
      return this.getStandardText(this.diagnosticCode);
    },

    getStandardText: function (error) {
      error = error || this.errorCode;
      return this.stdTexts[error] || "";
    },
    getDiagnostics: function (errorCode) {
      var code = (errorCode / 1) || this.errorCode;
      var message = this.lastError.getStandardText("e01") + " " + code + " : " + this.getStandardText(code) + " ;  ";
      if (code == this.errorCode) {
        message += this.getStandardText("e02") + " : ";
      } else {
        message = this.getStandardText("e03");
        message += " " + this.errorCode;
        message += " : " + this.getStandardText() + " ;  ";
        message += this.getStandardText("e04") + " : ";
      }
      message += this.getStandardText(this.diagnosticCode);
      if (this.extraText)
        message += " :  " + this.extraText;
      return message;
    },

    stdTexts: {
      "0": "No error",
      "100": "General Error",
      "101": "General Exception",
      "102": "General Initialization Failure",
      "103": "Already Initialized",
      "104": "Content Instance Terminated",
      "111": "General Termination Failure",
      "112": "Termination Before Initialization",
      "113": "Termination After Termination",
      "122": "Retrieve Data Before Initialization",
      "123": "Retrieve Data After Termination",
      "132": "Store Data Before Initialization",
      "133": "Store Data After Termination",
      "142": "Commit Before Initialization",
      "143": "Commit After Termination",

      "200": "Syntax Error",
      "201": "General Argument Error",

      "300": "RTS Error",
      "301": "General Get Failure",
      "351": "General Set Failure",
      "391": "General Commit Failure",

      "400": "Data model errors",
      "401": "Undefined Data Model Element",
      "402": "Unimplemented Data Model Element",
      "403": "Data Model Element Value Not Initialized",
      "404": "Data Model Element Is Read Only",
      "405": "Data Model Element Is Write Only",
      "406": "Data Model Element Type Mismatch",
      "407": "Data Model Element Value Out Of Range",
      "408": "Data Model Dependency Not Established",

      "d0": "success",
      "d01": "Unknown error",
      "d02": "element depth exceeds tree depth",
      "d03": "element name does not match tree name",
      "d04": "attempting to add child to leaf node",
      "d05": "only leaf nodes may have values",
      "d06": "element not supported",
      "d07": "invalid integer number format",
      "d08": "invalid decimal number format",
      "d09": "minutes and seconds must be only 2 digits",
      "d10": "must have hours,minutes, and seconds as hh:mm:ss.ss, hhh:mm:ss.ss, or hhhh:mm:ss.ss",
      "d11": "value not in vocabulary",
      "d13": "array elements require an index value",
      "d14": "array index out of range",
      "d15": "shorter than minimum length",
      "d16": "element not an array",
      "d17": "longer than maximum length",
      "d18": "invalid element name format",
      "d19": "_children,_count, and _version may not be set",
      "d20": "value must not be null",
      "d21": "only 'cmi' data model supported",
      "d22": "HACP error",
      "d23": "General error",

      "d24": "Initialize, Commit, and Terminate require an empty string as a parameter.",

      "d010": "Initialize may only be called once per SCO session.",
      "d011": "Cannot call Initialize after Terminate.",
      "d012": "Initialize call failed.",

      "d020": "Cannot call Terminate before Initialize':'",
      "d021": "Terminate may only be called once per SCO session.",
      "d022": "Terminate call failed.",

      "d030": "Cannot call GetValue before Initialize.",
      "d031": "Cannot call GetValue After Terminate.",
      "d032": "GetValue call failed.",
      "d034": "You can only set the value of this data element, not read it.",

      "d040": "Cannot call SetValue before Initialize.",
      "d041": "Cannot call SetValue After Terminate.",
      "d042": "SetValue call failed.",
      "d043": "You can only read the value of this data element, not write to it.",

      "d050": "Cannot call Commit before Initialize.",
      "d051": "Cannot call Commit After Terminate.",
      "d052": "Commit call failed.",

      "d26": "Not a valid 'cmi' data model element.",
      "d27": "That data element is not supported.",
      "d30": "only group and array nodes may have children",
      "d31": "the data model configuration file on the server is not the correct version for this version of the API adaptor applet",

      "d32": "'not attempted' can only be set by the LMS",
      "d33": "Identifier elements may not contain blanks, periods, or non-printable characters.",

      "d34": 'invalid format for "true-false" feedback type ("0", "1", "t", or "f")',
      "d35": 'invalid format for "choice" feedback type ("0"-"9","a"-"z" comma separated ie: "0,3,a,f")',
      "d36": 'invalid format for "numeric" feedback type (valid integer or decimal number)',
      "d37": 'invalid format for "likert" feedback type ("0"-"9" or "a"-"z")',

      "d38": 'invalid format for "matching" feedback type (pairs of "0"-"9" or "a"-"z" like: "0.1,5.g,h.x")',
      "d39": 'invalid format for "sequencing" feedback type ("0"-"9","a"-"z" comma separated ie: "0,3,a,f")',
      "d40": 'invalid format for "fill-in" feedback type (text up to 255 long)',
      "d41": 'invalid format for "performance" feedback type (text up to 255 long)',
      "d42": 'invalid format for "unknown" feedback type (text up to 255 long)',
      "d43": "value is out of allowed numeric range",
      "d44": "minutes and seconds must be less than 60 in value",
      "d45": "must be valid SCORM 2004 timespan as P[yY][mM][dD][T[hH][nM][s[.s]S]]",
      "d46": "HTTP communication error",
      "d47": "must be valid SCORM 2004 timestamp as YYYY[-MM[-DD[Thh[:mm[:ss[.s[TZD]]]]]]]",
      "d48": "invalid SCORM 2004 delimiter in string value",
      "e01": "Error:",
      "e02": "Diagnostic message:",
      "e03": "Last error encountered:",
      "e04": "Last diagnostic message:"
    },
    

  }

})(this);


