(function (win) {

  win.logger = function (initialmodel) {
  }

  win.logger.prototype =
  {
    log: function (text) { console.log(text)
    },
    warn: function (text) { console.warn(text) },
    error: function (text) { console.error(text) },
  }

})(this);


