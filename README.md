bpmonlinejs
===========

## constructor
```js
var bpmonline = require('bpmonline');

var bpm = new bpmonline({
	host: "HOST", //Example: EXAMPLE.COM
    	port: 80, //Default: isSecure ? 443 : 80
    	application: "ApplicationName", //Default '/'
    	isSecure: false //HTTP or HTTPS. Default: HTTP(false)
});
```

## Метод: connect
```js
bpm.connect({login: "Supervisor", password: "Supervisor"}, function(err, res) {
	if (err) {
		console.log(err);
	}
});
```
