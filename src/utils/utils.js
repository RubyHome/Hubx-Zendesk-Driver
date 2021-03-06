module.exports.strReplaceAll = function (target, search, replacement) {
    return target.split(search).join(replacement);
};
module.exports.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        }
        else {
            return;
        }
    }
    return o;
};
module.exports.getPointersStringArray = function (inArray, collectionFieldName, idPrefix) {
    var newArray = [];
    if (inArray) {
        if (inArray.length > 0) {
            inArray.forEach(function (item) {
                newArray.push(idPrefix + item[collectionFieldName]);
            });
        }
        else
            return null;
    }
    else
        return null;
    return newArray;
};
module.exports.SetObjectPointersByArrayAndField = function (userIdentifier, parentObjectArray, childrenObjectArray, pointersArrayFieldName, parentIdFieldName, childParentIdFieldName, childIdFieldName) {
    return new Promise((resolve, reject) => {
        parentObjectArray.forEach(function (parentItem) {
            let newArray = [];
            childrenObjectArray.forEach(function (childItem) {
                if (parentItem[parentIdFieldName] == childItem[childParentIdFieldName]) {
                    newArray.push(userIdentifier + '.' + childItem[childIdFieldName]);
                    childItem[childParentIdFieldName] = userIdentifier + '.' + childItem[childParentIdFieldName];
                }
            });
            if (newArray.length > 0) {
                parentItem[pointersArrayFieldName] = newArray;
            }
            else
                parentItem[pointersArrayFieldName] = null;
        });
        resolve(parentObjectArray);
    });
};
//# sourceMappingURL=utils.js.map