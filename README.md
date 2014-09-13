bpmonline. node.js module
===========
bpmonline is an extensible for [node](http://nodejs.org).Module contains api for [bpm'online](http://www.bpmonline.com/) 7.x solution
## constructor
```js
var bpmonline = require('bpmonline');

var bpm = new bpmonline({
	host: "HOST", //Example: EXAMPLE.COM
    	port: 80, //Default: isSecure ? 443 : 80
    	path: "/", //Default '/'
    	isSecure: false //HTTP or HTTPS. Default: HTTP(false)
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
