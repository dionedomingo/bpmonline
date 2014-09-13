var defaultWorkspaceName = "Default";

var querystring;
var request;

var initUri;
var initWorkspaceName;
function bpmonline(initOptions) {
    querystring = require('querystring');
    request = require('request');
    if (!initOptions) {
        throw  new Error("initOptions is undefined");
    }
    if (!initOptions.uri) {
        throw  new Error("initOptions.uri is undefined");
    }
    initUri = initOptions.uri;
}

function prepareLoginPostData(login, password, workspace) {
    if (!login || !password) {
        throw  new Error("login or password is undefined");
    }
    if (!workspace) {
        workspace = defaultWorkspaceName;
    }
    initWorkspaceName = workspace;
    var jsonData = {
        "TimeZoneOffset": 2147483647,
        "UserName": login,
        "UserPassword": password,
        "WorkspaceName": workspace
    };
    return jsonData;
}

function tryLogin(login, password, workspace, callback) {
    var data = prepareLoginPostData(login, password, workspace);

    var j = request.jar();
    request({
        uri:  initUri + "/ServiceModel/AuthService.svc/Login",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        json: data,
        jar: j
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            if (body.Code === 0) {
                var cookies = j.getCookies(initUri);
                bpmonline.cookieContainer = cookies;
                callback(null, cookies);
            } else {
                callback({
                    code: body.Code,
                    error: body.Message
                }, null);
            }
        }
    });
}

function getBpmonlineWorkspaceNumber(workspaceName, callback) {
    request({
        uri:  initUri + "/ServiceModel/AuthService.svc/GetWorkspacesData",
        method: "POST"
    }, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            var workspaces = JSON.parse(body);
            for (var i in workspaces) {
                if (workspaces[i].Key === (workspaceName || initWorkspaceName)) {
                    callback(null, workspaces[i].Value);
                    return;
                }
            }
            callback("Workspace not found", null);
        }
    });
}

function tryRunProcess(processName, args, cookies, callback) {
    getBpmonlineWorkspaceNumber(null, function (err, res) {
        if (err) {
            callback(err, null);
            return;
        }

        var uri = initUri + '/' + res + '/ServiceModel/ProcessEngineService.svc/'
            + processName + '/Execute' + (args ? ('?' + querystring.stringify(args)) : '');

        var j = request.jar();
        var cookieItems = bpmonline.cookieContainer || cookies;
        for (var i in cookieItems) {
            j.setCookie(cookieItems[i], initUri);
        }

        request({
            uri: uri,
            method: "POST",
            jar: j
        }, function (err, res, body) {
            if (!err && res.statusCode === 200) {
                callback(null, body);
            } else {
                callback(res, null);
            }
        });
    });
}

bpmonline.prototype.cookieContainer = {};

bpmonline.prototype.connect = function(connectInfo, callback) {
    if (!connectInfo) {
        throw new Error("connectInfo is undefined");
    }
    if (!connectInfo.login || !connectInfo.password) {
        throw new Error("Required fields not set");
    }
    tryLogin(connectInfo.login, connectInfo.password, connectInfo.workspace, callback);
}

bpmonline.prototype.runProcess = function(processName, args, cookies, callback) {
    if (!processName) {
        throw new Error("processName is undefined");
    }
    tryRunProcess(processName, args, cookies, callback);
}

module.exports = bpmonline;