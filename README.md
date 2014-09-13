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
```js
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
	if (err) {
		console.log(err);
	}
});
```

## Example: runProcess
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