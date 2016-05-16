var DateHelper = function() {
    var self = this;
    self.DATE = "2016-01-01T08:00:00.000Z";

    self.__truncate = function(obj) {
        if (typeof(obj) == "object") {
            for (var k in obj) {
                if (self.__truncate(obj[k])) {
                    obj[k] = self.DATE;
                }
            }
        } else if (typeof(obj) == "array") {
            for (var i = 0; i < obj.length; i++) {
                if (self.__truncate(obj[i])) {
                    obj[i] = self.DATE;
                }
            }
        } else if (typeof(obj) == "string") {
            if (obj.substr(0, 4) == '2016') {
                return true;
            }
        }
        return false;
    }

    self.truncate = function(res) {
        self.__truncate(res.body);
    };
}

module.exports = {
    date:   new DateHelper()
}
