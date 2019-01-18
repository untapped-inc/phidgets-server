var phidget22 = require('phidget22');

var SERVER_PORT = 5661;

function main() {

	if (process.argv.length != 3) {
		console.log('usage: node PHSensor.js <server address>');
		process.exit(1);
	}
	var hostname = process.argv[2];

	console.log('connecting to:' + hostname);
	var conn = new phidget22.Connection(SERVER_PORT, hostname, { name: 'Server Connection', passwd: '' });
	conn.connect()
		.then(runExample)
		.catch(function (err) {
			console.error('Error running example:', err.message);
			process.exit(1);
		});
}

function runExample() {

	console.log('connected to server');
	var ch = new phidget22.PHSensor();

	ch.onAttach = function (ch) {
		console.log(ch + ' attached');
		console.log('Min PH:' + ch.getMinPH());
		console.log('Max PH:' + ch.getMaxPH());
	};

	ch.onDetach = function (ch) {
		console.log(ch + ' detached');
	};

	ch.onPHChange = function (pH) {
		console.log('pH:' + pH + ' (' + this.getPH() + ')');
	};

	ch.open().then(function (ch) {
		console.log('channel open');
	}).catch(function (err) {
		console.log('failed to open the channel:' + err);
	});
}

if (require.main === module)
	main();
