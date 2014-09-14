bpmonline. node.js module
===========
bpmonline is an extensible for [node](http://nodejs.org). Module contains api for [bpm'online](http://www.bpmonline.com/) 7.x solution
## constructor
```js
var bpmonline = require('bpmonline');

var bpm = new bpmonline({
	uri: "http://demo.bpmonline.com"
});
```

## Documentation

### Methods

* [`connect`](#connect)
* [`runProcess`](#runProcess)
* [`throwProcessSignal`](#throwProcessSignal)
* [`customRestService`](#customRestService) 

<a name="connect" />
### connect(connectInfo, callback)

Authorization function. The function returns authorization cookies.

__Arguments__

* *`connectInfo` - Json object with connect properties.
* `callback(err, res)` - A callback which is called when function complete, or an error occurs.

__Examples__
```js
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var cookies = res; //Authorized Cookies
	}
});
```

<a name="runProcess" />
### runProcess(processName, args, cookies, callback)

Function, that run business process in bpm'online.

__Arguments__

* *`processName` - Name of bpm`online process that must be run.
* `args` - Process arguments(Json object).
* `cookies` - Cookie container from [`connect`](#connect) response. Optional when first call [`connect`](#connect) method
* `callback(err, res)` - A callback which is called when function complete, or an error occurs.
 
__Examples__
```js
//cookies get from connect and using in runProcess
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
    bpm.runProcess("ProcessName", {
	    Param1: "Hello,",
	    Param2: "world",
	    ResultParameterName: "Out1"},
    null, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var bpmXmlResponse = res; //process response 
	}
    });
});

//runProcess with cookies from store
var cookies = {}; //take from connect method

bpm.runProcess("ProcessName", {Param1: "Hello,", Param2: "world", ResultParameterName: "Out1"},
    cookies, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var bpmXmlResponse = res; //process response 
	}
});
```

<a name="throwProcessSignal" />
### throwProcessSignal(signalName, cookies, callback)

Function, that run business process in bpm'online by signal. 

__Arguments__

* *`signalName` - Name of the bpm`online signal that runs the processes.
* `cookies` - Cookie container from [`connect`](#connect) response. Optional when first call [`connect`](#connect) method
* `callback(err, res)` - A callback which is called when function complete, or an error occurs.
 
__Examples__
```js
//cookies get from connect and using in throwProcessSignal
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
    bpm.throwProcessSignal("SignalName", null, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var bpmXmlResponse = res; //process response 
	}
    });
});

//throwProcessSignal with cookies from store
var cookies = {}; //take from connect method

bpm.throwProcessSignal("SignalName", cookies, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var bpmXmlResponse = res; //process response 
	}
});
```

<a name="customRestService" />
### customRestService(serviceName, methodName, json, cookies, callback)

Function, that run any configuration rest-service in bpm'online. 

__Arguments__

* *`serviceName` - Name of the bpm`online rest-service.
* *`methodName` - Method name of the bpm`online rest-service.
* `json` - json.
* `cookies` - Cookie container from [`connect`](#connect) response. Optional when first call [`connect`](#connect) method
* `callback(err, res)` - A callback which is called when function complete, or an error occurs.
 
__Examples__
```js
//cookies get from connect and using in throwProcessSignal
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
	bpm.customRestService('CustomBpmService', 'Invoke', {param1: "Hello", param2: "World"}, null, function(err, res) {
		if (err) {
			console.log(err);
		} else {
			var bpmJsonResponse = res; //service response 
		}
	});
});

//throwProcessSignal with cookies from store
var cookies = {}; //take from connect method

bpm.customRestService('CustomBpmService', 'Invoke', {param1: "Hello", param2: "World"}, cookies, function(err, res) {
	if (err) {
		console.log(err);
	} else {
		var bpmJsonResponse = res; //service response 
	}
});
```
