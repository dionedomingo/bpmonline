bpmonline. node.js module
===========
bpmonline is an extensible for [node](http://nodejs.org).Module contains api for [bpm'online](http://www.bpmonline.com/) 7.x solution
## constructor
```js
var bpmonline = require('bpmonline');

var bpm = new bpmonline({
	uri: "http://demo.bpmonline.com"
});
```

## Example: connect
connect - authorization function. The function returns authorization cookies
```js
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
	if (err) {
		console.log(err);
	}
});
```

## Example: runProcess
runProcess - function, that run business process in bpm'online. 
```js
//cookies get from connect and using in runProcess
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
    bpm.runProcess("ProcessName", {
	    Param1: "Hello,",
	    Param2: "world",
	    ResultParameterName: "Out1"},
    null, function(err, res) {
        //TODO
    });
});

//runProcess with cookies from store
var cookies = {}; //take from connect method

bpm.runProcess("ProcessName", {Param1: "Hello,", Param2: "world", ResultParameterName: "Out1"},
    cookies, function(err, res) {
    //TODO
});
```

## Example: throwProcessSignal
throwProcessSignal - function, that run business process in bpm'online by signal. 
```js
//cookies get from connect and using in throwProcessSignal
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
    bpm.throwProcessSignal("SignalName", null, function(err, res) {
        //TODO
    });
});

//runProcess with cookies from store
var cookies = {}; //take from connect method

bpm.throwProcessSignal("SignalName", cookies, function(err, res) {
    //TODO
});
```