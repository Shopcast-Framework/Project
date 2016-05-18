var Clone = require('clone');

var DATE = "2016-01-01T00:00:00.000Z";

var DateHelper = function() {
    var self = this;
    self.DATE = DATE;

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
};

var BuilderHelper = function(orm) {
    var self = this;

    self.init = function(orm) {
        self.orm = orm;
    };

    self.new = function(name, datas) {
        var model = self.orm.db[name],
            newobj = {
                id: datas.id + 1
            };

        for (var k in model.tableAttributes) {
            var attr = self.orm.db.User.tableAttributes[k];
            var field = attr.field;

            if (field == 'id') { continue; }
            if (attr.type.constructor.key == 'STRING') {
                newobj[field] = datas[field] ? "new " + datas[field] : null;
            } else if (attr.type.constructor.key == 'DATE') {
                newobj[field] = DATE;
            } else {
                newobj[field] = datas[field] || null;
            }
        }
        return newobj;
    };

    self.edit = function(name, datas) {
        var model = self.orm.db[name],
            newobj = {
                id: datas.id
            };

        for (var k in model.tableAttributes) {
            var attr = self.orm.db.User.tableAttributes[k];
            var field = attr.field;

            if (field == 'id') { continue; }
            if (attr.type.constructor.key == 'STRING') {
                newobj[field] = datas[field] ? "edit " + datas[field] : null;
            } else if (attr.type.constructor.key == 'DATE') {
                newobj[field] = DATE;
            } else {
                newobj[field] = datas[field] || null;
            }
        }
        return newobj;
    };

    self.associate = function(name, originalDatas, ids, ressources) {
        var associations = [],
            datas = Clone(originalDatas);

        for (var n in ids) {
            var _datas = datas[n]
            var _ids = ids[n];
            for (var i in _ids) {
                var id = _ids[i];
                associations.push(ressources[id]);
            }
            datas[n][name] = (associations.length == 1 ? associations[0] : associations);
        }
        return datas;
    }

    self.init(orm);
    return self;
};

module.exports = function(orm) {
    return {
        date:   new DateHelper(),
        build:  new BuilderHelper(orm)
    };
}
