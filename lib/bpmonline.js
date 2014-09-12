var defaultWorkspaceName = "Default";

var http;

var initHost;
var initPort;
function bpmonline(initOptions) {
    if (!initOptions) {
        throw  new Error("initOptions is undefined");
    }
    if (!initOptions.host) {
        throw  new Error("initOptions.host is undefined");
    }
    http = initOptions.isSecure ? require('https') : require('http');
    initHost = initOptions.host;
    initPort = initOptions.port;
    if (!initOptions.port) {
        initPort = initOptions.isSecure ? 443 : 80;
    }
}

function prepareLoginPostData(login, password, workspace) {
    if (!login || !password) {
        throw  new Error("login or password is undefined");
    }
    if (!workspace) {
        workspace = defaultWorkspaceName;
    }
    var jsonData = {
        "TimeZoneOffset": 2147483647,
        "UserName": login,
        "UserPassword": password,
        "WorkspaceName": workspace
    };
    return JSON.stringify(jsonData);
}

function postData(login, password, workspace, callback) {
    var postData = prepareLoginPostData(login, password, workspace);
    var postOptions = {
        host: initHost,
        port: initPort,
        path: '/ServiceModel/AuthService.svc/Login',
        method: 'POST',
        headers: {
            'Content-Type': 'text/json',
            'Content-Length': postData.length
        }
    };


    var post_req = http.request(postOptions, function(res) {
        if (res.statusCode === 200) {
            var cookie = res.headers["set-cookie"];
            res.on('data', function(data) {
                var resMessage = JSON.parse(data.toString("utf-8"));
                if (resMessage.Code === 0) {
                    callback(null, cookie);
                } else {
                    callback({
                        code: resMessage.Code,
                        error: resMessage.Message
                    }, null);
                }
            });
        }
    });

    post_req.write(postData);
    post_req.end();
}

bpmonline.prototype.connect = function(connectInfo, callback) {
    if (!connectInfo) {
        throw new Error("connectInfo is undefined");
    }
    if (!connectInfo.login || !connectInfo.password) {
        throw new Error("Required fields not set");
    }
    postData(connectInfo.login, connectInfo.password, connectInfo.workspace, callback);
}

bpmonline.prototype.process = function(processName, args, retParamName) {
    throw new Error("Method not implemented");
}

module.exports = bpmonline;