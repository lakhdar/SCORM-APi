(function (win) {

  win.dataService = function (initialmodel) {

  }

  win.dataService.prototype =
  {
    save: function (data) {
      console.log("dataService .save :" + data);
    },
    getData: function (data) {
      console.log("dataService .getData :" + data)
    },

  }

})(this);


